import React from 'react';
import { registerModule, registerSubModule } from '../../lib/moduleMapper';
import { BotonesModule } from './botones';

// Example module components (you can replace these with your actual components)
const DashboardModule = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Dashboard module content</p>
  </div>
);

const UsersModule = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Users</h1>
    <p>Users module content</p>
  </div>
);

const UserListSubModule = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">User List</h1>
    <p>User list submodule content</p>
  </div>
);

const UserCreateSubModule = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Create User</h1>
    <p>Create user submodule content</p>
  </div>
);

const ProductsModule = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Products</h1>
    <p>Products module content</p>
  </div>
);

const SettingsModule = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p>Settings module content</p>
  </div>
);

// Module registration function
export const registerAllModules = () => {
  // Register Botones module
  registerModule({
    id: 'botones',
    name: 'Botones',
    path: '/botones',
    component: BotonesModule,
    icon: '🔘',
    description: 'Módulo de demostración de botones',
    isActive: true
  });

  // Register Dashboard module
  registerModule({
    id: 'dashboard',
    name: 'Dashboard',
    path: '/',
    component: DashboardModule,
    icon: '🏠',
    description: 'Main dashboard view',
    isActive: true
  });

  // Register Users module with submodules
  registerModule({
    id: 'users',
    name: 'Users',
    path: '/users',
    component: UsersModule,
    icon: '👥',
    description: 'User management',
    isActive: true,
    submodules: []
  });

  // Register Users submodules
  registerSubModule('users', {
    id: 'user-list',
    name: 'User List',
    path: '/list',
    component: UserListSubModule,
    icon: '📋',
    description: 'List all users',
    isActive: true
  });

  registerSubModule('users', {
    id: 'user-create',
    name: 'Create User',
    path: '/create',
    component: UserCreateSubModule,
    icon: '➕',
    description: 'Create new user',
    isActive: true
  });

  // Register Products module
  registerModule({
    id: 'products',
    name: 'Products',
    path: '/products',
    component: ProductsModule,
    icon: '📦',
    description: 'Product management',
    isActive: true
  });

  // Register Settings module
  registerModule({
    id: 'settings',
    name: 'Settings',
    path: '/settings',
    component: SettingsModule,
    icon: '⚙️',
    description: 'Application settings',
    isActive: true
  });
};

// Initialize modules when this file is imported
registerAllModules();
