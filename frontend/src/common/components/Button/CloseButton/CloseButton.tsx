export default function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button onClick={onClose}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 6.25C25.625 6.25 6.25 25.625 6.25 50C6.25 74.375 25.625 93.75 50 93.75C74.375 93.75 93.75 74.375 93.75 50C93.75 25.625 74.375 6.25 50 6.25ZM66.875 71.875L50 55L33.125 71.875L28.125 66.875L45 50L28.125 33.125L33.125 28.125L50 45L66.875 28.125L71.875 33.125L55 50L71.875 66.875L66.875 71.875Z"
          fill="#EA5F41"
          className="hover:fill-cpc-dark-red transition-colors duration-300"
        />
      </svg>
    </button>
  );
}
