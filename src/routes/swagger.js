import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "배고프쥬 API",
      version: "1.0.0",
      description: "API with express",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

/**
 * @swagger
 * paths:
 *  /api/users/sign-up:
 *    post:
 *      tags:
 *      - users
 *      summary: 회원가입
 *      description: 회원가입
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  required: true
 *                password:
 *                  type : string
 *                  required: true
 *                confirmPassword:
 *                  type : string
 *                  required: true
 *                name:
 *                  type : string
 *                  required: true
 *                addr:
 *                  type : string
 *                  required: true
 *                number:
 *                  type : string
 *                  required: true
 *                  default: 010-0000-0000
 *                role:
 *                  type : string
 *                  required: true
 *                  default: user/owner
 *      produces:
 *      - application/json
 *      responses:
 *       201:
 *        description: 회원가입 성공
 *       400:
 *        description: 이미 존재하는 이메일입니다. / 요청 값 존재하지 않음
 *  /api/users/sign-in:
 *    post:
 *      tags:
 *      - users
 *      summary: 로그인
 *      description: 로그인
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  required: true
 *                password:
 *                  type : string
 *                  required: true
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 로그인 성공
 *       400:
 *        description: 이메일 혹은 비밀번호가 일치하지 않음
 *  /api/users/sendEmail:
 *    post:
 *      tags:
 *      - users
 *      summary: 이메일 인증
 *      description: 이메일 인증
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  required: true
 *      produces:
 *      - application/json
 *      responses:
 *       400:
 *        description: 포인트 중복 지급 불가 / user만 포인트 지급 가능
 *  /api/stores:
 *    post:
 *      tags:
 *      - stores
 *      summary: 업장 등록
 *      description: 업장 등록
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                category:
 *                  type: string
 *                  required: true
 *                  default: korean/asian/china/japan/western/fastfood/chicken/pizza
 *                storeName:
 *                  type: string
 *                  required: true
 *                addr:
 *                  type: string
 *                  required: true
 *                number:
 *                  type: string
 *                  required: true
 *                  default: 010-0000-0000
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 업장 생성 완료
 *       400:
 *        description: 요청 값 올바르지 않음
 *    get:
 *      tags:
 *      - stores
 *      summary: 업장 목록 조회
 *      description: 업장 목록 조회
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 업장 목록 조회 완료
 *       500:
 *        description: 비정상적 서버 에러
 *  /api/stores/{storeId}:
 *    put:
 *      tags:
 *      - stores
 *      summary: 업장 정보 수정
 *      description: 업장 정보 수정
 *      parameters:
 *        - name: storeId
 *          in: path
 *          description: 수정할 업장 storeId 입력
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                category:
 *                  type: string
 *                  required: true
 *                  default: korean/asian/china/japan/western/fastfood/chicken/pizza
 *                storeName:
 *                  type: string
 *                  required: true
 *                addr:
 *                  type: string
 *                  required: true
 *                number:
 *                  type: string
 *                  required: true
 *                  default: 010-0000-0000
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 업장 수정 완료
 *       400:
 *        description: 요청한 값이 존재하지 않음 / 업장 정보 없음
 *    delete:
 *      tags:
 *      - stores
 *      summary: 업장 삭제
 *      description: 업장 삭제
 *      parameters:
 *        - name: storeId
 *          in: path
 *          description: 삭제할 업장 storeId 입력
 *          required: true
 *          schema:
 *            type: integer
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 업장 삭제 완료
 *       400:
 *        description: 업장 정보 없음
 *  /api/stores/{storeId}/menus:
 *    post:
 *      tags:
 *      - menus
 *      summary: 메뉴 등록
 *      description: 메뉴 등록
 *      parameters:
 *        - name: storeId
 *          in: path
 *          description: 메뉴 등록할 업장 storeId 입력
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                menuName:
 *                  type: string
 *                  required: true
 *                menuImage:
 *                  type: string
 *                  required: true
 *                price:
 *                  type: integer
 *                  required: true
 *                content:
 *                  type: string
 *                  required: true
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 메뉴 생성 완료
 *       400:
 *        description: 요청 값 올바르지 않음
 *    get:
 *      tags:
 *      - menus
 *      summary: 메뉴 목록 조회
 *      description: 메뉴 목록 조회
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 메뉴 목록 조회 완료
 *       500:
 *        description: 비정상적 서버 에러
 *  /api/stores/{storeId}/menus/{menuId}:
 *    put:
 *      tags:
 *      - menus
 *      summary: 메뉴 정보 수정
 *      description: 메뉴 정보 수정
 *      parameters:
 *        - name: storeId
 *          in: path
 *          description: 메뉴 수정할 업장 storeId 입력
 *          required: true
 *          schema:
 *            type: integer
 *        - name: menuId
 *          in: path
 *          description: 수정할 메뉴 menuId 입력
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                menuName:
 *                  type: string
 *                  required: true
 *                menuImage:
 *                  type: string
 *                  required: true
 *                price:
 *                  type: integer
 *                  required: true
 *                content:
 *                  type: string
 *                  required: true
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 메뉴 수정 완료
 *       400:
 *        description: 요청한 값이 존재하지 않음 / 메뉴 정보 없음 / 메뉴 이름 중복
 *    delete:
 *      tags:
 *      - menus
 *      summary: 메뉴 삭제
 *      description: 메뉴 삭제
 *      parameters:
 *        - name: storeId
 *          in: path
 *          description: 메뉴 삭제할 업장 storeId 입력
 *          required: true
 *          schema:
 *            type: integer
 *        - name: menuId
 *          in: path
 *          description: 삭제할 메뉴 menuId 입력
 *          required: true
 *          schema:
 *            type: integer
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 메뉴 삭제 완료
 *       400:
 *        description: 메뉴 정보 없음
 *  /api/store:
 *    get:
 *      tags:
 *      - stores
 *      summary: 키워드 기반 업장 검색
 *      description: 키워드 기반 업장 검색
 *      parameters:
 *        - name: keyword
 *          in: query
 *          description: 검색 키워드 입력
 *          schema:
 *            type: string
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 키워드 기반 조회 성공
 *  /api/store/ranking:
 *    get:
 *      tags:
 *      - stores
 *      summary: 업장 랭킹 조회
 *      description: 업장 랭킹 조회
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 랭킹 조회 성공
 *  /api/review:
 *    post:
 *      tags:
 *      - review
 *      summary: 리뷰 등록
 *      description: 리뷰 등록
 *      parameters:
 *        - name: storeId
 *          in: query
 *          description: 리뷰 등록할 storeId 입력
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                reviewContent:
 *                  type: string
 *                  required: true
 *                rating:
 *                  type: integer
 *                  required: true
 *      produces:
 *      - application/json
 *      responses:
 *       201:
 *        description: 리뷰 등록 완료
 *       400:
 *        description: 요청 값 올바르지 않음
 *    get:
 *      tags:
 *      - review
 *      summary: 내 리뷰 조회
 *      description: 내 리뷰 조회
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 내 리뷰 조회 완료
 *    put:
 *      tags:
 *      - review
 *      summary: 리뷰 수정
 *      description: 리뷰 수정
 *      parameters:
 *        - name: reviewId
 *          in: query
 *          description: 수정할 리뷰 reivewId 입력
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                reviewContent:
 *                  type: string
 *                  required: true
 *                rating:
 *                  type: integer
 *                  required: true
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 리뷰 수정 완료
 *    delete:
 *      tags:
 *      - review
 *      summary: 리뷰 삭제
 *      description: 리뷰 삭제
 *      parameters:
 *        - name: reviewId
 *          in: query
 *          description: 삭제할 리뷰 reviewId 입력
 *          required: true
 *          schema:
 *            type: integer
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 업장 삭제 완료
 *       400:
 *        description: 업장 정보 없음
 *  /api/review/store:
 *    get:
 *      tags:
 *      - review
 *      summary: 업장 리뷰 조회
 *      description: 업장 리뷰 조회
 *      parameters:
 *        - name: storeId
 *          in: query
 *          description: 조회할 업장 storeId 입력
 *          schema:
 *            type: integer
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 업장 리뷰 조회 성공
 *  /api/orders/order:
 *    post:
 *      tags:
 *      - orders
 *      summary: 주문 요청
 *      description: 주문 요청
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                storeId:
 *                  type: integer
 *                  required: true
 *                menus:
 *                  type: array
 *                  required: true
 *                  items:
 *                    type: object
 *                    default: {menu: 1, quantity: 1}
 *      produces:
 *      - application/json
 *      responses:
 *       201:
 *        description: 주문 요청 완료
 *       400:
 *        description: 주문 정보 올바르지 않음 / 메뉴 정보 없음 / 잔액 부족
 *  /api/orders:
 *    get:
 *      tags:
 *      - orders
 *      summary: 전체 주문내역 조회
 *      description: 전체 주문내역 조회
 *      parameters:
 *        - name: status
 *          in: query
 *          description: 조회할 상태 (order / delivering / success / cancel)
 *          required: true
 *          schema:
 *            type: string
 *            default: all
 *        - name: value
 *          in: query
 *          description: 정렬 기준 (asc / desc)
 *          required: true
 *          schema:
 *            type: string
 *            default: desc
 *        - name: page
 *          in: query
 *          description: 페이지
 *          required: true
 *          schema:
 *            type: integer
 *            default: 1
 *        - name: perPage
 *          in: query
 *          description: 페이지당 데이터 갯수
 *          required: true
 *          schema:
 *            type: integer
 *            default: 10
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 주문 조회 완료
 *       400:
 *        description: 가게 정보 없음
 *  /api/orders/{orderId}:
 *    get:
 *      tags:
 *      - orders
 *      summary: 주문 단건 조회
 *      description: 주문 단건 조회
 *      parameters:
 *        - name: orderId
 *          in: path
 *          description: 조회할 주문내역 orderId
 *          required: true
 *          schema:
 *            type: integer
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 주문 단건 조회 성공
 *       400:
 *        description: 주문 내역 정보 없음 / 열람 권한 없음
 *  /api/orders/{orderId}/orderStatusChange:
 *    post:
 *      tags:
 *      - orders
 *      summary: 주문 상태 변경
 *      description: 주문 상태 변경
 *      parameters:
 *        - name: orderId
 *          in: path
 *          description: 상태 변경할 주문 orderId
 *          required: true
 *          schema:
 *            type: integer
 *        - name: status
 *          in: query
 *          description: 변경할 주문의 상태 (delivering / success / cancel)
 *          required: true
 *          schema:
 *            type: string
 *            default: delivering
 *      produces:
 *      - application/json
 *      responses:
 *       201:
 *        description: 주문 상태 변경 성공
 *       400:
 *        description: 요청 값 올바르지 않음 / 주문내역 정보 없음 / 권한 없음 / 완료된 주문
 */

export { swaggerUi, specs };
