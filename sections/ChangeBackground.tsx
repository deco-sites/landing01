import { useComponent } from "./Component.tsx";

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format textarea
   */
  description?: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @format color-input
   */
  textColor?: string;
}

export async function action(props: Props, req: Request): Promise<Props> {
  const form = await req.formData();
  const newBackgroundColor = form.get("backgroundColor") as string;
  const newTextColor = form.get("textColor") as string;
  return { ...props, backgroundColor: newBackgroundColor, textColor: newTextColor };
}

export function loader(props: Props) {
  return props;
}

export default function FancySection({
  title = "Fancy Section",
  description = "This is a fancy section with customizable colors.",
  backgroundColor = "#ffffff",
  textColor = "#000000",
}: Props) {
  return (
    <section
      style={{ backgroundColor, color: textColor }}
      class="p-8 rounded-lg shadow-md flex flex-col items-center"
    >
      <h2 class="text-3xl font-bold mb-4">{title}</h2>
      <p class="text-center mb-8">{description}</p>
      <form
        hx-post={useComponent(import.meta.url, { title, description, backgroundColor, textColor })}
        hx-target="closest section"
        hx-swap="outerHTML"
        class="flex gap-4"
      >
        <div>
          <label for="backgroundColor" class="block mb-2">
            Background Color:
          </label>
          <input
            type="color"
            name="backgroundColor"
            value={backgroundColor}
            class="form-color-input"
          />
        </div>
        <div>
          <label for="textColor" class="block mb-2">
            Text Color:
          </label>
          <input type="color" name="textColor" value={textColor} class="form-color-input" />
        </div>
        <button type="submit" class="btn btn-primary">
          <span class="inline [.htmx-request_&]:hidden">Update Colors</span>
          <span class="hidden [.htmx-request_&]:inline loading loading-spinner" />
        </button>
      </form>
    </section>
  );
}