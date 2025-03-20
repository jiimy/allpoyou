import axios from "axios";
import { NextResponse } from "next/server";
import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: 'http://localhost:9200', // Elasticsearch 서버 주소
});

export async function POST(request: Request) {
  const { query } = await request.json();
  try {
    // Elasticsearch에서 쿼리 검색
    const result = await client.search({
      index: 'your-index', // 사용하려는 Elasticsearch 인덱스 이름
      body: {
        query: {
          match: { title: query }, // 예시: 'title' 필드에서 쿼리와 일치하는 값을 찾음
        },
      },
    });

    // res.status(200).json(result.body.hits.hits);
  } catch (error) {
    // res.status(500).json({ error: error.message });
  }

  // const cleanData = JSON.parse(JSON.stringify(response.data));
  return NextResponse.json({
    // cleanData,
  });
}
