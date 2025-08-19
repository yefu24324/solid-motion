import { Cursor, CursorFollow, CursorProvider } from "../components/animate-ui/components/cursor.jsx";

export function AnimationUICursor() {
  return (
    <div class="max-w-[400px] h-[400px] w-full rounded-xl bg-muted flex items-center justify-center">
      <p class="font-medium italic text-muted-foreground">Move your mouse over the div</p>
      <CursorProvider>
        <Cursor>
          <svg class="size-6 text-blue-500" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
              fill="currentColor"
            />
          </svg>
        </Cursor>
        <CursorFollow>
          <div class="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm shadow-lg">Designer</div>
        </CursorFollow>
      </CursorProvider>
    </div>
  );
}
