// MVC Route Handler - ProjectController'ı kullanır

import { NextRequest } from 'next/server';
import { ProjectController } from '@/controllers/ProjectController';

const projectController = new ProjectController();

export async function GET(request: NextRequest) {
     return await projectController.index(request);
}

export async function POST(request: NextRequest) {
     return await projectController.store(request);
}
