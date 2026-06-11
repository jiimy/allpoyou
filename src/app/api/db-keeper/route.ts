// 디비 활동이 1주 또는 2주로 멈췄을때 user 추가하고 지우는 코드


// // app/api/db-keeper/route.ts
// import { createClient } from '@supabase/supabase-base'

// export async function GET() {
//   const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

//   // 1. users 테이블에 테스트용 더미 행 하나 삽입 (데이터 추가 발생!)
//   const { data } = await supabase
//     .from('users')
//     .insert([{ user_id: 'ping_user', password_hash: 'ping', security_question: 'ping', security_answer_hash: 'ping' }])
//     .select()

//   if (data && data[0]) {
//     // 2. 방금 넣은 더미 데이터 바로 삭제 (데이터 제거 발생!)
//     await supabase.from('users').delete().eq('id', data[0].id)
//   }

//   return new Response('DB 생존 신고 완료', { status: 200 })
// }