import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '../lib/ui/sidebar';

import {
  User,
  ChevronsUpDown,
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogIn,
  LogOut,
  LogInIcon,
} from 'lucide-react';

import React, { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import Avatar from '../lib/ui/avatar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Logo from './logo';

// Menu items
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Post',
    url: '/createpost',
    icon: Inbox,
  },
  {
    title: 'About',
    url: '/about',
    icon: User,
  },
];

export function SidebarComponent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="my-2">
              <Logo />
              SilentPost
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="w-full"
                    >
                      <a
                        href={item.url}
                        className="text-gray-900 no-underline w-full"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarMenuButton className="w-full justify-between gap-3 h-12 bg-gray-200">
              <div className="flex items-center gap-2">
                <Avatar name={user?.name} />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {user?.name || 'LOGIN'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email || 'Or create account'}
                  </span>
                </div>
              </div>
              {isLoggedIn ? (
                <LogOut
                  className="text-red-500"
                  onClick={() => {
                    logout();
                    toast.success('👋 Logged out successfully!');
                    navigate('/login');
                  }}
                />
              ) : (
                <LogInIcon onClick={() => navigate('/login')} />
              )}
            </SidebarMenuButton>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 min-w-100vh">
        <div className="px-4 py-2">
          <SidebarTrigger className="h-4 w-4 mt-2" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
