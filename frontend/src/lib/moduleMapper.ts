// Module mapping system for easy module and submodule management
import React from 'react';

// Navigation structure types
export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  description?: string;
  submodules?: NavigationSubItem[];
}

export interface NavigationSubItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  description?: string;
}

export interface ModuleConfig {
  id: string;
  name: string;
  path: string;
  component: React.ComponentType;
  icon?: string;
  description?: string;
  submodules?: SubModuleConfig[];
  permissions?: string[];
  isActive?: boolean;
}

export interface SubModuleConfig {
  id: string;
  name: string;
  path: string;
  component: React.ComponentType;
  icon?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
}

export interface ModuleMapper {
  modules: ModuleConfig[];
  getModule: (id: string) => ModuleConfig | undefined;
  getSubModule: (moduleId: string, subModuleId: string) => SubModuleConfig | undefined;
  getActiveModules: () => ModuleConfig[];
  getModulesByPermission: (permission: string) => ModuleConfig[];
}

// Module registry
const moduleRegistry: ModuleConfig[] = [];

// Module mapper implementation
export const moduleMapper: ModuleMapper = {
  modules: moduleRegistry,

  getModule: (id: string) => {
    return moduleRegistry.find(module => module.id === id);
  },

  getSubModule: (moduleId: string, subModuleId: string) => {
    const module = moduleRegistry.find(m => m.id === moduleId);
    return module?.submodules?.find(sub => sub.id === subModuleId);
  },

  getActiveModules: () => {
    return moduleRegistry.filter(module => module.isActive !== false);
  },

  getModulesByPermission: (permission: string) => {
    return moduleRegistry.filter(module => 
      module.isActive !== false && 
      (!module.permissions || module.permissions.includes(permission))
    );
  }
};

// Function to register a new module
export const registerModule = (config: ModuleConfig): void => {
  const existingIndex = moduleRegistry.findIndex(module => module.id === config.id);
  
  if (existingIndex >= 0) {
    moduleRegistry[existingIndex] = config;
  } else {
    moduleRegistry.push(config);
  }
};

// Function to register a submodule
export const registerSubModule = (moduleId: string, subModuleConfig: SubModuleConfig): void => {
  const module = moduleRegistry.find(m => m.id === moduleId);
  
  if (module) {
    if (!module.submodules) {
      module.submodules = [];
    }
    
    const existingIndex = module.submodules.findIndex(sub => sub.id === subModuleConfig.id);
    
    if (existingIndex >= 0) {
      module.submodules[existingIndex] = subModuleConfig;
    } else {
      module.submodules.push(subModuleConfig);
    }
  }
};

// Function to get all routes for React Router
export const getModuleRoutes = (): Array<{
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}> => {
  const routes: Array<{
    path: string;
    component: React.ComponentType;
    exact?: boolean;
  }> = [];

  moduleRegistry.forEach(module => {
    if (module.isActive !== false) {
      routes.push({
        path: module.path,
        component: module.component,
        exact: true
      });

      // Add submodule routes
      if (module.submodules) {
        module.submodules.forEach(subModule => {
          if (subModule.isActive !== false) {
            routes.push({
              path: `${module.path}${subModule.path}`,
              component: subModule.component,
              exact: true
            });
          }
        });
      }
    }
  });

  return routes;
};

// Function to get navigation structure
export const getNavigationStructure = (): NavigationItem[] => {
  return moduleRegistry
    .filter(module => module.isActive !== false)
    .map(module => ({
      id: module.id,
      name: module.name,
      path: module.path,
      icon: module.icon,
      description: module.description,
      submodules: module.submodules
        ?.filter(sub => sub.isActive !== false)
        .map(sub => ({
          id: sub.id,
          name: sub.name,
          path: `${module.path}${sub.path}`,
          icon: sub.icon,
          description: sub.description
        }))
    }));
};
