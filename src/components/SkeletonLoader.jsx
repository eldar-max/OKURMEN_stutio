import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Course Card Skeleton
export const CourseCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
    <Skeleton height={128} className="sm:h-32 md:h-36" />
    <div className="p-4 sm:p-5 md:p-6">
      <Skeleton height={24} width="80%" className="mb-2" />
      <Skeleton height={16} width="60%" className="mb-4" />
      <Skeleton count={3} height={12} className="mb-2" />
      <div className="mt-4">
        <Skeleton height={40} borderRadius={20} />
      </div>
    </div>
  </div>
);

// Team Card Skeleton
export const TeamCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
    <Skeleton height={256} />
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
      <Skeleton height={20} width="70%" className="mb-2" baseColor="#3b82f6" highlightColor="#60a5fa" />
      <Skeleton height={16} width="50%" className="mb-4" baseColor="#3b82f6" highlightColor="#60a5fa" />
      <Skeleton height={12} width="40%" baseColor="#3b82f6" highlightColor="#60a5fa" />
    </div>
  </div>
);

// Dashboard Card Skeleton
export const DashboardCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <Skeleton circle width={48} height={48} />
      <Skeleton width={60} height={24} />
    </div>
    <Skeleton height={32} width="50%" className="mb-2" />
    <Skeleton height={16} width="70%" />
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 5 }) => (
  <tr className="border-b dark:border-gray-700">
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-6 py-4">
        <Skeleton height={16} />
      </td>
    ))}
  </tr>
);

// Stats Card Skeleton
export const StatsCardSkeleton = () => (
  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <Skeleton circle width={48} height={48} baseColor="#60a5fa" highlightColor="#93c5fd" />
    </div>
    <Skeleton height={36} width="60%" className="mb-2" baseColor="#60a5fa" highlightColor="#93c5fd" />
    <Skeleton height={16} width="80%" baseColor="#60a5fa" highlightColor="#93c5fd" />
  </div>
);

// Profile Skeleton
export const ProfileSkeleton = () => (
  <div className="flex items-center space-x-4">
    <Skeleton circle width={48} height={48} />
    <div className="flex-1">
      <Skeleton height={20} width="60%" className="mb-2" />
      <Skeleton height={16} width="40%" />
    </div>
  </div>
);

// Grid Skeleton (for multiple items)
export const GridSkeleton = ({ count = 6, SkeletonComponent = CourseCardSkeleton }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonComponent key={index} />
    ))}
  </div>
);

// List Skeleton
export const ListSkeleton = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <div className="flex items-center space-x-4">
          <Skeleton circle width={40} height={40} />
          <div className="flex-1">
            <Skeleton height={16} width="70%" className="mb-2" />
            <Skeleton height={12} width="50%" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Chart Skeleton
export const ChartSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <Skeleton height={24} width="40%" className="mb-4" />
    <Skeleton height={200} />
  </div>
);

// Form Skeleton
export const FormSkeleton = () => (
  <div className="space-y-4">
    <div>
      <Skeleton height={20} width="30%" className="mb-2" />
      <Skeleton height={44} />
    </div>
    <div>
      <Skeleton height={20} width="30%" className="mb-2" />
      <Skeleton height={44} />
    </div>
    <div>
      <Skeleton height={20} width="30%" className="mb-2" />
      <Skeleton height={100} />
    </div>
    <Skeleton height={48} />
  </div>
);

export default {
  CourseCardSkeleton,
  TeamCardSkeleton,
  DashboardCardSkeleton,
  TableRowSkeleton,
  StatsCardSkeleton,
  ProfileSkeleton,
  GridSkeleton,
  ListSkeleton,
  ChartSkeleton,
  FormSkeleton
};
