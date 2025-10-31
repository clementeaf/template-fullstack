// Module mapping system for easy module and submodule management
import React from 'react';
import { select } from 'radashi';

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

/**
 * Obtiene un módulo por su ID
 * @param id - ID del módulo a buscar
 * @returns El módulo encontrado o undefined
 */
const getModuleById = (id: string): ModuleConfig | undefined => {
  return moduleRegistry.find((module: ModuleConfig) => module.id === id);
};

/**
 * Obtiene un submódulo por su ID dentro de un módulo
 * @param moduleId - ID del módulo padre
 * @param subModuleId - ID del submódulo
 * @returns El submódulo encontrado o undefined
 */
const getSubModuleById = (moduleId: string, subModuleId: string): SubModuleConfig | undefined => {
  const module = moduleRegistry.find((m: ModuleConfig) => m.id === moduleId);
  return module?.submodules ? module.submodules.find((sub: SubModuleConfig) => sub.id === subModuleId) : undefined;
};

/**
 * Obtiene todos los módulos activos
 * @returns Array de módulos activos
 */
const getActiveModulesInternal = (): ModuleConfig[] => {
  return select(
    moduleRegistry,
    module => module,
    module => module.isActive !== false
  );
};

/**
 * Obtiene módulos filtrados por permiso
 * @param permission - Permiso requerido
 * @returns Array de módulos que cumplen el permiso
 */
const getModulesByPermissionInternal = (permission: string): ModuleConfig[] => {
  return select(
    moduleRegistry,
    module => module,
    module => 
      module.isActive !== false && 
      (!module.permissions || module.permissions.includes(permission))
  );
};

// Module mapper implementation
export const moduleMapper: ModuleMapper = {
  modules: moduleRegistry,

  getModule: getModuleById,

  getSubModule: getSubModuleById,

  getActiveModules: getActiveModulesInternal,

  getModulesByPermission: getModulesByPermissionInternal
};

/**
 * Registra un nuevo módulo o actualiza uno existente
 * @param config - Configuración del módulo a registrar
 */
export const registerModule = (config: ModuleConfig): void => {
  const existingModule = moduleRegistry.find((module: ModuleConfig) => module.id === config.id);
  
  if (existingModule) {
    const existingIndex = moduleRegistry.indexOf(existingModule);
    moduleRegistry[existingIndex] = config;
  } else {
    moduleRegistry.push(config);
  }
};

/**
 * Registra un submódulo dentro de un módulo existente
 * @param moduleId - ID del módulo padre
 * @param subModuleConfig - Configuración del submódulo a registrar
 */
export const registerSubModule = (moduleId: string, subModuleConfig: SubModuleConfig): void => {
  const module = moduleRegistry.find((m: ModuleConfig) => m.id === moduleId);
  
  if (module) {
    if (!module.submodules) {
      module.submodules = [];
    }
    
    const existingSubModule = module.submodules.find((sub: SubModuleConfig) => sub.id === subModuleConfig.id);
    
    if (existingSubModule) {
      const existingIndex = module.submodules.indexOf(existingSubModule);
      module.submodules[existingIndex] = subModuleConfig;
    } else {
      module.submodules.push(subModuleConfig);
    }
  }
};

/**
 * Obtiene todas las rutas de módulos y submódulos para React Router
 * @returns Array de rutas configuradas para React Router
 */
export const getModuleRoutes = (): Array<{
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}> => {
  const activeModules = select(
    moduleRegistry,
    module => module,
    module => module.isActive !== false
  );

  const moduleRoutes = activeModules.map(module => ({
    path: module.path,
    component: module.component,
    exact: true as const
  }));

  const subModuleRoutes = activeModules.flatMap(module => {
    if (!module.submodules) {
      return [];
    }

    return select(
      module.submodules,
      subModule => ({
        path: `${module.path}${subModule.path}`,
        component: subModule.component,
        exact: true as const
      }),
      subModule => subModule.isActive !== false
    );
  });

  return [...moduleRoutes, ...subModuleRoutes];
};

/**
 * Obtiene la estructura de navegación completa con módulos y submódulos
 * @returns Array de items de navegación con submódulos incluidos
 */
export const getNavigationStructure = (): NavigationItem[] => {
  return select(
    moduleRegistry,
    module => {
      const submodules = module.submodules
        ? select(
            module.submodules,
            sub => ({
              id: sub.id,
              name: sub.name,
              path: `${module.path}${sub.path}`,
              icon: sub.icon,
              description: sub.description
            }),
            sub => sub.isActive !== false
          )
        : undefined;

      return {
        id: module.id,
        name: module.name,
        path: module.path,
        icon: module.icon,
        description: module.description,
        submodules
      };
    },
    module => module.isActive !== false
  );
};
