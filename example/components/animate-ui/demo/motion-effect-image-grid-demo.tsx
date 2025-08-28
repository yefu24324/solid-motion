import { MotionEffect } from "../effects/motion-effect.jsx";

export const MotionEffectImageGridDemo = () => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <MotionEffect
          delay={0.5 + index * 0.1}
          fade
          inView
          slide={{
            direction: "down",
          }}
          zoom
        >
          <img
            alt="Slide In Demo"
            class="w-[300px] h-[200px] object-cover object-center bg-muted rounded-xl flex items-center justify-center"
            src={`https://picsum.photos/seed/${index + 100}/600/400`}
          />
        </MotionEffect>
      ))}
    </div>
  );
};
