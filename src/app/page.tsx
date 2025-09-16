export default function Home() {
  console.log(process.env.API_URL);
  return (
    <div>
      메인 페이지 입니다.
      <h1 className="--color-header">페이지 타이틀</h1>
    </div>
  );
}
