import React, {ReactNode} from "react";
import BaseLayout from "./BaseLayout";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({children}) => {
  return (
    <div>
      <BaseLayout>
        <main>{children}</main>
        <aside className="bg-gray-100 p-4">
          <h2 className="text-xl font-bold">Admin Tools</h2>
          <ul>
            <li>
              <a href="/admin/users" className="text-blue-500 hover:underline">
                Manage Users
              </a>
            </li>
            <li>
              <a href="/admin/courses" className="text-blue-500 hover:underline">
                Manage Courses
              </a>
            </li>
          </ul>
        </aside>
      </BaseLayout>
    </div>
  );
};

export default AdminLayout;
