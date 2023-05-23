import classes from "@/styles/Skeleton.module.css";

const Skeleton = ({ width, height, borderRadius, custom }) => {
  return (
    <div
      className={classes["skeleton-box"]}
      style={{
        width,
        height,
        borderRadius,
        ...custom,
      }}
    ></div>
  );
};

export default Skeleton;
