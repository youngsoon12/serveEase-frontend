import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">
        페이지를 찾을 수 없습니다.
      </h2>
      <p className="text-gray-600 mb-6">
        요청하신 페이지는 존재하지 않거나, 다른 주소로 변경되었습니다.
      </p>
      <Link href="/">
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer">
          로그인으로 돌아가기
        </button>
      </Link>
    </div>
  );
}
