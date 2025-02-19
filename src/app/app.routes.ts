import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/layout/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
        children: [
            {
                path: 'workspace',
                loadComponent: () => import('./components/pages/workspace/workspace.component').then(m => m.WorkspaceComponent)
            },
            {
                path: '',
                redirectTo: 'workspace',
                pathMatch: 'full'
            }
        ]
    },
];
