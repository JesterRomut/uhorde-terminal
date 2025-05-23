import { error } from "@sveltejs/kit";

export const prerender = "auto";

/** @type {import("./$types").PageLoad} */
export function load({ params }) {
    if (params.page === "hello-world") {
        return {
            title: "Hello world!",
            content: "Welcome to our blog. Lorem ipsum dolor sit amet...",
        };
    }

    error(404, "Not found");
}
