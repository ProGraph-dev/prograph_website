import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout';
import Chat from '@/components/molecules/Chat/Chat/Chat';


export default function DashboardChat() {
  return (
    <DashboardLayout title="Chat | Dashboard | ProGraph">
      <Chat />
    </DashboardLayout>
  );
}