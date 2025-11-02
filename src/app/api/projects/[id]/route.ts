// MVC Route Handler - Tek proje için CRUD işlemleri

import { NextRequest } from 'next/server';
import { ProjectController } from '@/controllers/ProjectController';

const projectController = new ProjectController();

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  return await projectController.show(request, resolvedParams);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  return await projectController.update(request, resolvedParams);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  return await projectController.destroy(request, resolvedParams);
}