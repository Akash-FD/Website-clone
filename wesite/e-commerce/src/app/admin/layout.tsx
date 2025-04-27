import AdminSidebar from "@/Components/AdminSidebar";


export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div className="mx-5 flex">
          <div className="flex shadow-2xl w-[200px] p-5 min-w-[200px] h-screen">
            <AdminSidebar />
          </div>
          <div className="flex p-5">{children}</div>
        </div>
   
    </>
  );
}
