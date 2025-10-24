import { useMemo } from 'react';
import {
  moduleMapper,
  getModuleRoutes,
  getNavigationStructure,
  type ModuleConfig,
  type SubModuleConfig,
  type NavigationItem,
} from '../lib/moduleMapper';

// Hook to get all modules
export const useModules = (): ModuleConfig[] => {
  return useMemo(() => moduleMapper.modules, []);
};

// Hook to get active modules
export const useActiveModules = (): ModuleConfig[] => {
  return useMemo(() => moduleMapper.getActiveModules(), []);
};

// Hook to get modules by permission
export const useModulesByPermission = (permission: string): ModuleConfig[] => {
  return useMemo(() =>
    moduleMapper.getModulesByPermission(permission),
    [permission]
  );
};

// Hook to get a specific module
export const useModule = (id: string): ModuleConfig | undefined => {
  return useMemo(() => moduleMapper.getModule(id), [id]);
};

// Hook to get a specific submodule
export const useSubModule = (moduleId: string, subModuleId: string): SubModuleConfig | undefined => {
  return useMemo(() =>
    moduleMapper.getSubModule(moduleId, subModuleId),
    [moduleId, subModuleId]
  );
};

// Hook to get navigation structure
export const useNavigationStructure = (): NavigationItem[] => {
  return useMemo(() => getNavigationStructure(), []);
};

// Hook to get module routes for React Router
export const useModuleRoutes = (): Array<{
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}> => {
  return useMemo(() => getModuleRoutes(), []);
};

// Types for module by path result
export interface ModuleByPathResult {
  type: 'module';
  data: ModuleConfig;
}

export interface SubModuleByPathResult {
  type: 'submodule';
  data: SubModuleConfig;
  parent: ModuleConfig;
}

// Hook to get module by path
export const useModuleByPath = (path: string): ModuleByPathResult | SubModuleByPathResult | null => {
  return useMemo(() => {
    // Check main modules first
    const module = moduleMapper.modules.find(m => m.path === path);
    if (module) return { type: 'module', data: module };

    // Check submodules
    for (const m of moduleMapper.modules) {
      if (m.submodules) {
        const subModule = m.submodules.find(sub =>
          `${m.path}${sub.path}` === path
        );
        if (subModule) {
          return { type: 'submodule', data: subModule, parent: m };
        }
      }
    }

    return null;
  }, [path]);
};
