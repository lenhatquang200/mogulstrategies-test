'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AccessPortalLink({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(session ? '/investors/kyc1' : '/login');
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
