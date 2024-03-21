//전역 단일 게시글 타입 정의
export type Article = {
  article_id?: number;
  board_type_code?: number;
  article_type_code?: number;
  title: string;
  contents: string;
  view_count?: number;
  ip_address?: string;
  is_display_code: number;
  reg_date?: string;
  reg_member_id?: number;
  edit_date?: string | null;
  edit_member_id?: number | null;
};

//전역 게시글 타입 인터페이스
export interface IArticle {
  article_id?: number;
  board_type_code?: number;
  article_type_code?: number;
  title: string;
  contents: string | null;
  is_display_code: number;
}

//전역 게시글 타입 인터페이스
export type MemberEntry = {
  email: string;
  password: string;
  name?: string;
};
