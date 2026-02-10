"use client";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/providers/AuthProvider";

/* 기존 BreadCrumb용 Menus - 주석 해제 시 사용
interface IMenu {
  title: string;
  url: string;
  initial: string;
}

const Menus: IMenu[] = [
  {
    title: "대시보드",
    url: "/",
    initial: "",
  },
  {
    title: "센터 측정 현황",
    url: "/measure",
    initial: "measure",
  },
  {
    title: "사용자 회원 관리",
    url: "/user",
    initial: "user",
  },
  {
    title: "코치 관리",
    url: "/coach",
    initial: "coach",
  },
  {
    title: "기기 관리",
    url: "/device",
    initial: "device",
  },
  {
    title: "매니저 관리",
    url: "/manager",
    initial: "manager",
  },
  {
    title: "설정",
    url: "/setting",
    initial: "setting",
  },
];
*/

const breadcrumbLinkClass =
  "text-base xl:text-xl transition-all duration-200 rounded-xl px-1.5 py-0.5 -mx-1.5 -my-0.5 hover:opacity-80 hover:bg-muted/60";

export function LayoutBreadCrumb() {
  const pathName = usePathname();
  const router = useRouter();
  const centerSn = useAuthStore((state) => state.centerSn);
  const centerName = useAuthStore((state) => state.centerName);

  const isCenterPage = pathName === "/center";
  if (isCenterPage) return null;
  return (
    <div className="flex items-center gap-6">
      {/* 센터목록 링크 */}
      <Link
        href="/center"
        className={`${breadcrumbLinkClass} text-slate-950 dark:text-foreground`}
      >
        센터 목록
      </Link>

      {/* 센터 이름 - 있을 때만 표시 */}
      {centerSn && centerName && (
        <span
          className={`text-base xl:text-xl dark:text-white `}
        >
          {centerName}
        </span>
      )}
    </div>
  );
//   return (
//   <Breadcrumb>
//     <BreadcrumbList>
//       <BreadcrumbItem>
//         {isCenterPage ? (
//           <span
//             className={`${breadcrumbLinkClass} font-semibold text-toggleAccent dark:text-white cursor-default hover:opacity-90`}
//             aria-current="page"
//           >
//             센터목록
//           </span>
//         ) : (
//           <BreadcrumbLink asChild>
//             <Link
//               href="/center"
//               className={`${breadcrumbLinkClass} text-slate-950 dark:text-foreground`}
//             >
//               센터목록
//             </Link>
//           </BreadcrumbLink>
//         )}
//       </BreadcrumbItem>

//       {/* 센터 이름이 있을 때만 표시 */}
//       {centerSn && centerName && (
//         <>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbLink asChild>
//               <Link
//                 href={`/center/${centerSn}`}
//                 className={`${breadcrumbLinkClass} font-medium text-toggleAccent dark:text-white`}
//               >
//                 {centerName}
//               </Link>
//             </BreadcrumbLink>
//           </BreadcrumbItem>
//         </>
//       )}
//     </BreadcrumbList>
//   </Breadcrumb>
// );
}
