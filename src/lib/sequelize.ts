import { Sequelize } from "sequelize";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Parse the DATABASE_URL to extract connection details
const url = new URL(process.env.DATABASE_URL);
const dbName = url.pathname.substring(1); // Remove the leading '/'
const dbUser = url.username;
const dbPassword = url.password;
const dbHost = url.hostname;
const dbPort = url.port;

// Create a connection to PostgreSQL without specifying a database
// This allows us to create the database if it doesn't exist
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: console.log, // Enable logging to see SQL queries
  dialectOptions: {
    ssl: false // SSL'i devre dışı bırak
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /TimeoutError/,
    ],
    max: 3,
  },
});

// Function to create database if it doesn't exist
export const createDatabaseIfNotExists = async () => {
  try {
    // First try to connect to the specified database
    await sequelize.authenticate();
    console.log("✅ PostgreSQL bağlantısı başarılı!");
    return true;
  } catch (error: unknown) {
    console.log("❌ Belirtilen veritabanına bağlantı kurulamadı, veritabanı oluşturuluyor...");
    
    // If connection fails, try to create the database
    const sequelizeAdmin = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/postgres`, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: false // SSL'i devre dışı bırak
      }
    });
    
    try {
      // Connect to the default 'postgres' database
      await sequelizeAdmin.authenticate();
      
      // Create the database
      await sequelizeAdmin.query(`CREATE DATABASE "${dbName}";`);
      console.log(`✅ Veritabanı '${dbName}' başarıyla oluşturuldu!`);
      
      // Close the admin connection
      await sequelizeAdmin.close();
      
      // Now try to connect to our target database
      await sequelize.authenticate();
      console.log("✅ PostgreSQL bağlantısı başarılı!");
      return true;
    } catch (adminError) {
      console.error("❌ Veritabanı oluşturma hatası:", adminError instanceof Error ? adminError.message : String(adminError));
      await sequelizeAdmin.close();
      throw adminError;
    }
  }
};

// Bağlantıyı test et ve tabloları sync et
export const connectDB = async () => {
  try {
    // Try to create database if it doesn't exist
    await createDatabaseIfNotExists();
    
    // Tabloları oluştur (eğer yoksa)
    await sequelize.sync({ alter: true });
    console.log("✅ Database sync başarılı!");
    return true;
  } catch (error: unknown) {
    console.error("❌ PostgreSQL bağlantı hatası:", error instanceof Error ? error.message : String(error));
    
    const sequelizeError = error as unknown as Record<string, unknown>;
    if (error instanceof Error && sequelizeError.original && typeof sequelizeError.original === 'object' && sequelizeError.original !== null && 'code' in sequelizeError.original && (sequelizeError.original as Record<string, unknown>).code === '3D000') {
      console.error("❌ Database bulunamadı. Lütfen veritabanının varlığını kontrol edin.");
    }
    
    throw error;
  }
};