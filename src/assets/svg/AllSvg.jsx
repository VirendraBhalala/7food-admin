export const Loader = (props) => {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...props}>
      <path
        d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        fill="#df1317"
        stroke="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 51;360 50 51"
        ></animateTransform>
      </path>
    </svg>
  );
};

export const RippleLoaderSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200px"
    height="200px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle cx="50" cy="50" r="0" fill="none" stroke="#fbd76e" strokeWidth="2">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1s"
        values="0;40"
        keyTimes="0;1"
        keySplines="0 0.2 0.8 1"
        calcMode="spline"
        begin="0s"
      ></animate>
      <animate
        attributeName="opacity"
        repeatCount="indefinite"
        dur="1s"
        values="1;0"
        keyTimes="0;1"
        keySplines="0.2 0 0.8 1"
        calcMode="spline"
        begin="0s"
      ></animate>
    </circle>
    <circle cx="50" cy="50" r="0" fill="none" stroke="#f9d409" strokeWidth="2">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1s"
        values="0;40"
        keyTimes="0;1"
        keySplines="0 0.2 0.8 1"
        calcMode="spline"
        begin="-0.5s"
      ></animate>
      <animate
        attributeName="opacity"
        repeatCount="indefinite"
        dur="1s"
        values="1;0"
        keyTimes="0;1"
        keySplines="0.2 0 0.8 1"
        calcMode="spline"
        begin="-0.5s"
      ></animate>
    </circle>
  </svg>
);
