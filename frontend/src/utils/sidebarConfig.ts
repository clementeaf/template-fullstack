export interface SidebarItem {
  id: string;
  label: string;
  path: string;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: 'botones',
    label: 'Botón',
    path: '/buttons'
  }
];
