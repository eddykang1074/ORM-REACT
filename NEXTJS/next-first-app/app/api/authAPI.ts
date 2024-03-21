import { Article, MemberEntry } from "@/app/types/definitions";

export async function postRegistFetcher(url: string, member: MemberEntry) {
  console.log("postRegistFetcher=================>", member);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      //Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
  return response.json();
}

export async function postLoginFetcher(url: string, member: MemberEntry) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
  return response.json();
}
