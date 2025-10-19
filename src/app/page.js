import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Link href="/admin">
        <button
          style={{
            padding: "20px 40px",
            fontSize: "18px",
            background: "#E50914",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          관리자 페이지로 이동
        </button>
      </Link>
    </div>
  );
}
