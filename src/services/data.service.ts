
import { Injectable } from '@angular/core';

export interface Idiom {
  id: number;
  word: string; // The answer (Hangul)
  meaning: string; // The question
  hanja: string; // Hint 1
  situation: string; // Hint 2
  criticalHint: string; // Hint 3
  difficulty: number; // 1 (Easy) to 3 (Hard)
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private idioms: Idiom[] = [
    // ==================================================================
    // LEVEL 1: Easy / Basic (Stages 1-3) - Total 55 items
    // ==================================================================
    { id: 101, word: '일석이조', meaning: '한 가지 일을 하여 두 가지 이익을 얻음.', hanja: '一石二鳥', situation: '꿩 먹고 알 먹고, 도랑 치고 가재 잡는 상황.', criticalHint: '돌 하나로 새 두 마리를 잡는다.', difficulty: 1 },
    { id: 102, word: '금시초문', meaning: '이제야 비로소 처음 들음.', hanja: '今時初聞', situation: '난생처음 듣는 이야기라며 놀랄 때.', criticalHint: '지금 처음 듣는 말.', difficulty: 1 },
    { id: 103, word: '동문서답', meaning: '묻는 말에 대하여 아주 딴판인 대답을 함.', hanja: '東問西答', situation: '짜장면 먹었냐고 물었는데 어제 축구 봤다고 대답함.', criticalHint: '동쪽을 묻는데 서쪽을 답하다.', difficulty: 1 },
    { id: 104, word: '다다익선', meaning: '많으면 많을수록 좋음.', hanja: '多多益善', situation: '돈이나 좋은 물건은 많을수록 좋다고 할 때.', criticalHint: '많을수록 더 좋다.', difficulty: 1 },
    { id: 105, word: '작심삼일', meaning: '단단히 먹은 마음이 사흘을 가지 못함.', hanja: '作心三日', situation: '새해 목표를 세웠는데 3일 만에 포기했을 때.', criticalHint: '마음먹은 지 3일.', difficulty: 1 },
    { id: 106, word: '오리무중', meaning: '무슨 일의 갈피를 잡을 수 없음.', hanja: '五里霧中', situation: '범인의 행방을 전혀 알 수 없을 때.', criticalHint: '5리나 되는 안개 속.', difficulty: 1 },
    { id: 107, word: '유비무환', meaning: '미리 준비가 되어 있으면 걱정할 것이 없음.', hanja: '有備無患', situation: '비가 올까 봐 미리 우산을 챙기는 상황.', criticalHint: '준비가 있으면 근심이 없다.', difficulty: 1 },
    { id: 108, word: '일취월장', meaning: '나날이 다달이 자라거나 발전함.', hanja: '日就月將', situation: '실력이 눈에 띄게 늘었을 때 칭찬하는 말.', criticalHint: '날로 나아가고 달로 발전함.', difficulty: 1 },
    { id: 109, word: '백전백승', meaning: '싸울 때마다 모조리 이김.', hanja: '百戰百勝', situation: '나가는 경기마다 모두 승리할 때.', criticalHint: '백 번 싸워 백 번 이김.', difficulty: 1 },
    { id: 110, word: '부전자전', meaning: '아버지의 성품이나 행동을 아들이 그대로 물려받음.', hanja: '父傳子傳', situation: '아빠랑 아들이 붕어빵처럼 닮았을 때.', criticalHint: '아버지에게서 전해져 아들에게 전해짐.', difficulty: 1 },
    { id: 111, word: '대기만성', meaning: '크게 될 사람은 늦게 이루어짐.', hanja: '大器晩成', situation: '어릴 때는 두각을 못 나타내다가 나중에 성공한 사람.', criticalHint: '큰 그릇은 늦게 만들어진다.', difficulty: 1 },
    { id: 112, word: '구사일생', meaning: '아홉 번 죽을 뻔하다 한 번 살아남.', hanja: '九死一生', situation: '정말 위험한 사고에서 기적적으로 살아남음.', criticalHint: '여러 번 죽을 고비를 넘기고 살아남.', difficulty: 1 },
    { id: 113, word: '동고동락', meaning: '괴로움과 즐거움을 함께 함.', hanja: '同苦同樂', situation: '힘든 훈련을 함께 견뎌낸 전우들.', criticalHint: '같이 고생하고 같이 즐김.', difficulty: 1 },
    { id: 114, word: '팔방미인', meaning: '여러 방면에 능통한 사람.', hanja: '八方美人', situation: '공부도 잘하고 운동도 잘하고 노래도 잘할 때.', criticalHint: '어느 모로 보나 아름다운 사람.', difficulty: 1 },
    { id: 115, word: '이심전심', meaning: '마음과 마음이 서로 통함.', hanja: '以心傳心', situation: '말하지 않아도 친구가 내 기분을 알아줄 때.', criticalHint: '마음으로써 마음을 전하다.', difficulty: 1 },
    { id: 116, word: '십시일반', meaning: '여러 사람이 조금씩 힘을 합하면 한 사람을 돕기 쉬움.', hanja: '十匙一飯', situation: '친구들이 조금씩 돈을 모아 어려운 이웃을 도울 때.', criticalHint: '열 숟가락이면 밥 한 그릇.', difficulty: 1 },
    { id: 117, word: '우왕좌왕', meaning: '이리저리 왔다 갔다 하며 방향을 종잡지 못함.', hanja: '右往左往', situation: '갑작스러운 사고에 사람들이 당황하여 움직일 때.', criticalHint: '오른쪽으로 갔다 왼쪽으로 갔다 함.', difficulty: 1 },
    { id: 118, word: '설상가상', meaning: '난처한 일이나 불행한 일이 잇따라 일어남.', hanja: '雪上加霜', situation: '넘어진 데 덮친 격.', criticalHint: '눈 위에 서리가 더해짐.', difficulty: 1 },
    { id: 119, word: '권선징악', meaning: '착한 일을 권하고 악한 일을 징계함.', hanja: '勸善懲惡', situation: '옛날 동화의 주제로 자주 등장하는 내용.', criticalHint: '선은 권하고 악은 벌한다.', difficulty: 1 },
    { id: 120, word: '문전성시', meaning: '찾아오는 사람이 많아 집 문 앞이 시장을 이루다시피 함.', hanja: '門前成市', situation: '유명한 맛집 앞에 사람들이 줄을 서 있을 때.', criticalHint: '문 앞이 시장을 이룸.', difficulty: 1 },
    { id: 121, word: '박학다식', meaning: '학식이 넓고 아는 것이 많음.', hanja: '博學多識', situation: '모르는 게 없는 척척박사 친구.', criticalHint: '넓게 배우고 많이 안다.', difficulty: 1 },
    { id: 122, word: '비일비재', meaning: '어떤 현상이 드물지 아니하고 흔히 있음.', hanja: '非一非再', situation: '요즘 그런 일은 너무 흔해서 놀랍지도 않을 때.', criticalHint: '한 번도 아니고 두 번도 아님.', difficulty: 1 },
    { id: 123, word: '산해진미', meaning: '산과 바다에서 나는 온갖 귀한 맛.', hanja: '山海珍味', situation: '상다리가 부러지게 차려진 맛있는 음식들.', criticalHint: '산과 바다의 진귀한 맛.', difficulty: 1 },
    { id: 124, word: '삼삼오오', meaning: '서너 사람 또는 대여섯 사람이 떼를 지어 다니거나 무슨 일을 함.', hanja: '三三五五', situation: '학생들이 몇 명씩 짝을 지어 걸어갈 때.', criticalHint: '세 명 세 명 다섯 명 다섯 명.', difficulty: 1 },
    { id: 125, word: '선남선녀', meaning: '착한 남자와 착한 여자. 일반적인 사람들을 이르는 말.', hanja: '善男善女', situation: '결혼식장에 모인 잘생기고 예쁜 사람들.', criticalHint: '착한 남자와 착한 여자.', difficulty: 1 },
    { id: 126, word: '속수무책', meaning: '손을 묶은 것처럼 어찌할 도리가 없어 꼼짝 못 함.', hanja: '束手無策', situation: '갑자기 비가 쏟아지는데 우산이 없어 당황할 때.', criticalHint: '손이 묶여 꾀가 없음.', difficulty: 1 },
    { id: 127, word: '수수방관', meaning: '팔짱을 끼고 보고만 있다는 뜻으로, 간섭하거나 거들지 아니하고 그대로 버려둠.', hanja: '袖手傍觀', situation: '도와주지 않고 멀리서 구경만 할 때.', criticalHint: '소매에 손을 넣고 곁에서 봄.', difficulty: 1 },
    { id: 128, word: '심사숙고', meaning: '깊이 생각하고 깊이 고찰함.', hanja: '深思熟考', situation: '중요한 결정을 내리기 전에 오랫동안 고민할 때.', criticalHint: '깊이 생각하고 익숙하게 고찰함.', difficulty: 1 },
    { id: 129, word: '아수라장', meaning: '끔찍하게 흐트러져 엉망진창이 된 상태.', hanja: '阿修羅場', situation: '세일 행사장에 사람들이 몰려 난장판이 됨.', criticalHint: '싸움터처럼 혼란스러운 곳.', difficulty: 1 },
    { id: 130, word: '약방감초', meaning: '어떤 일에나 빠짐없이 끼어드는 사람이나 물건.', hanja: '藥房甘草', situation: '어느 모임에나 꼭 참석하는 친구.', criticalHint: '약방의 감초.', difficulty: 1 },
    { id: 131, word: '어불성설', meaning: '말이 이치에 맞지 않음.', hanja: '語不成說', situation: '앞뒤가 전혀 안 맞는 핑계를 댈 때.', criticalHint: '말이 말씀이 되지 않음.', difficulty: 1 },
    { id: 132, word: '오매불망', meaning: '자나 깨나 잊지 못함.', hanja: '寤寐不忘', situation: '멀리 떠난 가족을 그리워하며 기다릴 때.', criticalHint: '자나 깨나 잊지 못함.', difficulty: 1 },
    { id: 133, word: '유언비어', meaning: '아무 근거 없이 널리 퍼진 소문.', hanja: '流言蜚語', situation: '연예인에 대한 헛소문이 인터넷에 떠돌 때.', criticalHint: '떠돌아다니는 말.', difficulty: 1 },
    { id: 134, word: '유유자적', meaning: '속세를 떠나 아무 속박 없이 조용하고 편안하게 삶.', hanja: '悠悠自適', situation: '주말에 아무 걱정 없이 한가롭게 쉴 때.', criticalHint: '여유 있고 한가로움.', difficulty: 1 },
    { id: 135, word: '이구동성', meaning: '여러 사람의 말이 한 입에서 나오는 것처럼 같음.', hanja: '異口同聲', situation: '모두가 동시에 정답을 외칠 때.', criticalHint: '입은 다르나 소리는 같음.', difficulty: 1 },
    { id: 136, word: '이실직고', meaning: '사실을 그대로 일러바침.', hanja: '以實直告', situation: '거짓말하지 말고 솔직하게 털어놓으라고 할 때.', criticalHint: '사실로써 바로 알림.', difficulty: 1 },
    { id: 137, word: '인산인해', meaning: '사람이 산을 이루고 바다를 이루듯이 많음.', hanja: '人山人海', situation: '축제 현장에 사람이 엄청나게 많을 때.', criticalHint: '사람의 산과 사람의 바다.', difficulty: 1 },
    { id: 138, word: '일거양득', meaning: '한 가지 일로 두 가지 이익을 얻음.', hanja: '一擧兩得', situation: '운동도 하고 살도 빼고.', criticalHint: '한 번 들어 두 개를 얻음.', difficulty: 1 },
    { id: 139, word: '일편단심', meaning: '한 조각의 붉은 마음. 진심에서 우러나오는 변치 않는 마음.', hanja: '一片丹心', situation: '오직 한 사람만을 사랑하는 마음.', criticalHint: '한 조각 붉은 마음.', difficulty: 1 },
    { id: 140, word: '자화자찬', meaning: '자기가 그린 그림을 스스로 칭찬함. 자기가 한 일을 스스로 자랑함.', hanja: '自畫自讚', situation: '자기 잘났다고 스스로 떠벌릴 때.', criticalHint: '스스로 그리고 스스로 칭찬함.', difficulty: 1 },
    { id: 141, word: '전심전력', meaning: '온 마음과 온 힘을 다함.', hanja: '全心全力', situation: '시험 합격을 위해 모든 노력을 쏟을 때.', criticalHint: '모든 마음과 모든 힘.', difficulty: 1 },
    { id: 142, word: '주경야독', meaning: '낮에는 농사짓고 밤에는 글을 읽음. 어려운 여건 속에서도 꿋꿋이 공부함.', hanja: '晝耕夜讀', situation: '일하면서 밤새워 자격증 공부를 할 때.', criticalHint: '낮에는 밭 갈고 밤에는 책 읽음.', difficulty: 1 },
    { id: 143, word: '천하태평', meaning: '세상이 평온하고 무사함. 또는 걱정 없이 편안함.', hanja: '天下泰平', situation: '시험이 내일인데 잠만 자는 친구를 볼 때.', criticalHint: '세상이 아주 평안함.', difficulty: 1 },
    { id: 144, word: '칠전팔기', meaning: '일곱 번 넘어져도 여덟 번째 일어남. 실패를 거듭해도 굴하지 않고 다시 도전함.', hanja: '七顚八起', situation: '계속된 실패에도 포기하지 않고 도전할 때.', criticalHint: '일곱 번 구르고 여덟 번 일어남.', difficulty: 1 },
    { id: 145, word: '티끌모아태산', meaning: '작은 것도 모이면 큰 것이 됨.', hanja: '塵合泰山', situation: '동전 저금통을 털었더니 큰 돈이 되었을 때.', criticalHint: '먼지가 모여 큰 산.', difficulty: 1 },
    { id: 146, word: '학수고대', meaning: '학의 목처럼 목을 길게 빼고 기다림.', hanja: '鶴首苦待', situation: '택배 기사님이 오기만을 간절히 기다릴 때.', criticalHint: '학의 머리처럼 애태우며 기다림.', difficulty: 1 },
    { id: 147, word: '형형색색', meaning: '모양이나 종류가 다른 가지각색의 것.', hanja: '形形色色', situation: '꽃밭에 다양한 색깔의 꽃이 피어 있을 때.', criticalHint: '여러 가지 모양과 빛깔.', difficulty: 1 },
    { id: 148, word: '식은죽먹기', meaning: '어떤 일이 아주 하기 쉬움.', hanja: '易如反掌', situation: '이 문제는 너무 쉬워서 금방 풀 수 있을 때.', criticalHint: '손바닥 뒤집기.', difficulty: 1 },
    { id: 149, word: '무사무려', meaning: '아무런 생각이나 걱정이 없음.', hanja: '無思無慮', situation: '휴일에 아무 생각 없이 푹 쉴 때.', criticalHint: '생각도 없고 걱정도 없음.', difficulty: 1 },
    { id: 150, word: '무궁무진', meaning: '끝이 없고 다함이 없음.', hanja: '無窮無盡', situation: '그 사람의 잠재력은 끝이 없다.', criticalHint: '다함이 없고 끝이 없음.', difficulty: 1 },
    { id: 151, word: '백발백중', meaning: '백 번 쏘아 백 번 맞힘. 계획이 들어맞음.', hanja: '百發百中', situation: '그의 예상은 틀린 적이 없다.', criticalHint: '백 번 쏘아 백 번 맞음.', difficulty: 1 },
    { id: 152, word: '사시사철', meaning: '봄, 여름, 가을, 겨울의 네 계절. 일 년 내내.', hanja: '四時四節', situation: '이 가게는 일 년 내내 손님이 많다.', criticalHint: '네 때와 네 계절.', difficulty: 1 },
    { id: 153, word: '불편부당', meaning: '어느 한쪽으로 기울어지지 않고 공평함.', hanja: '不偏不黨', situation: '심판은 어느 팀 편도 들지 않고 공정해야 한다.', criticalHint: '치우치지 않고 무리 짓지 않음.', difficulty: 1 },
    { id: 154, word: '선견지명', meaning: '앞일을 미리 내다보는 지혜.', hanja: '先見之明', situation: '그의 예측대로 주가가 폭등했다.', criticalHint: '미리 보는 밝음.', difficulty: 1 },
    { id: 155, word: '소원성취', meaning: '원하던 바를 이루다.', hanja: '所願成就', situation: '드디어 꿈에 그리던 대학에 합격했다.', criticalHint: '원하는 바를 이룸.', difficulty: 1 },

    // ==================================================================
    // LEVEL 2: Intermediate (Stages 4-7) - Total 55 items
    // ==================================================================
    { id: 201, word: '동병상련', meaning: '어려운 처지에 있는 사람끼리 서로 가엾게 여김.', hanja: '同病相憐', situation: '같은 실수를 해서 혼나는 친구를 위로해줄 때.', criticalHint: '같은 병을 앓는 사람끼리 서로 불쌍히 여김.', difficulty: 2 },
    { id: 202, word: '새옹지마', meaning: '인생의 길흉화복은 변화가 많아 예측하기 어려움.', hanja: '塞翁之馬', situation: '나쁜 일이 일어났지만 결과적으로 좋은 일이 되었을 때.', criticalHint: '변방 노인의 말(馬).', difficulty: 2 },
    { id: 203, word: '청출어람', meaning: '제자가 스승보다 나음.', hanja: '靑出於藍', situation: '학생이 선생님보다 더 뛰어난 실력을 보일 때.', criticalHint: '푸른색은 쪽에서 나왔으나 쪽보다 더 푸르다.', difficulty: 2 },
    { id: 204, word: '과유불급', meaning: '지나친 것은 미치지 못한 것과 같음.', hanja: '過猶不及', situation: '욕심을 너무 부리다가 오히려 손해를 볼 때.', criticalHint: '지나침은 모자람과 같다.', difficulty: 2 },
    { id: 205, word: '금상첨화', meaning: '좋은 일 위에 또 좋은 일이 더하여짐.', hanja: '錦上添花', situation: '복권에 당첨됐는데 승진까지 했을 때.', criticalHint: '비단 위에 꽃을 더하다.', difficulty: 2 },
    { id: 206, word: '사상누각', meaning: '기초가 튼튼하지 못하여 오래 견디지 못할 일.', hanja: '砂上樓閣', situation: '기본기 없이 요령만 피우면 금방 무너짐.', criticalHint: '모래 위에 지은 집.', difficulty: 2 },
    { id: 207, word: '역지사지', meaning: '처지를 서로 바꾸어 생각함.', hanja: '易地思之', situation: '상대방의 입장이 되어 생각해 보라 할 때.', criticalHint: '땅(처지)을 바꾸어 생각하다.', difficulty: 2 },
    { id: 208, word: '오비이락', meaning: '아무 관계없이 한 일이 공교롭게도 다른 일과 때를 같이하여 억울하게 의심을 받음.', hanja: '烏飛梨落', situation: '내가 지나가자마자 물건이 떨어져서 범인으로 몰림.', criticalHint: '까마귀 날자 배 떨어진다.', difficulty: 2 },
    { id: 209, word: '주마간산', meaning: '자세히 살피지 아니하고 대충대충 보고 지나감.', hanja: '走馬看山', situation: '여행 가서 차 타고 풍경만 휙 보고 올 때.', criticalHint: '달리는 말 위에서 산을 구경함.', difficulty: 2 },
    { id: 210, word: '화룡점정', meaning: '무슨 일을 하는 데에 가장 중요한 부분을 완성함.', hanja: '畫龍點睛', situation: '프로젝트의 마지막 핵심 기능을 완벽하게 구현했을 때.', criticalHint: '용을 그리고 눈동자를 찍다.', difficulty: 2 },
    { id: 211, word: '감언이설', meaning: '남의 비위를 맞추거나 이로운 조건을 내세워 꾀는 말.', hanja: '甘言利說', situation: '사기꾼이 달콤한 말로 속이려 할 때.', criticalHint: '달콤한 말과 이로운 이야기.', difficulty: 2 },
    { id: 212, word: '고진감래', meaning: '고생 끝에 낙이 옴.', hanja: '苦盡甘來', situation: '힘든 수험 생활 끝에 합격했을 때.', criticalHint: '쓴 것이 다하면 단 것이 온다.', difficulty: 2 },
    { id: 213, word: '개과천선', meaning: '지나간 허물을 고치고 착하게 됨.', hanja: '改過遷善', situation: '나쁜 짓을 일삼던 사람이 마음을 고쳐먹고 새사람이 됨.', criticalHint: '허물을 고쳐 선으로 옮겨감.', difficulty: 2 },
    { id: 214, word: '다재다능', meaning: '재주와 능력이 여러 가지로 많음.', hanja: '多才多能', situation: '그 사람은 악기도 잘 다루고 그림도 잘 그린다.', criticalHint: '재주가 많고 능력도 많음.', difficulty: 2 },
    { id: 215, word: '동분서주', meaning: '사방으로 이리저리 바쁘게 돌아다님.', hanja: '東奔西走', situation: '행사를 준비하느라 쉴 새 없이 움직일 때.', criticalHint: '동쪽으로 뛰고 서쪽으로 달림.', difficulty: 2 },
    { id: 216, word: '반신반의', meaning: '얼마쯤 믿으면서도 한편으로는 의심함.', hanja: '半信半疑', situation: '정말 그게 사실일까 믿기지 않아 갸우뚱할 때.', criticalHint: '반은 믿고 반은 의심함.', difficulty: 2 },
    { id: 217, word: '유유상종', meaning: '같은 무리끼리 서로 사귐.', hanja: '類類相從', situation: '취미가 같은 친구들끼리 모여 다닐 때.', criticalHint: '끼리끼리 모임.', difficulty: 2 },
    { id: 218, word: '임기응변', meaning: '그때그때 처한 사태에 맞추어 즉각 그 자리에서 결정하거나 처리함.', hanja: '臨機應變', situation: '갑작스러운 질문에 당황하지 않고 재치 있게 대답함.', criticalHint: '기회에 임하여 변화에 대응함.', difficulty: 2 },
    { id: 219, word: '천우신조', meaning: '하늘이 돕고 신이 도움.', hanja: '天佑神助', situation: '도저히 불가능한 상황에서 기적적으로 살아남.', criticalHint: '하늘과 신의 도움.', difficulty: 2 },
    { id: 220, word: '갑론을박', meaning: '자기의 주장을 세우고 남의 주장을 반박함.', hanja: '甲論乙駁', situation: '회의 시간에 서로 의견이 달라 다투는 모습.', criticalHint: '갑이 논하면 을이 반박함.', difficulty: 2 },
    { id: 221, word: '고군분투', meaning: '남의 도움 없이 힘벅차게 해나감.', hanja: '孤軍奮鬪', situation: '팀원 없이 혼자서 프로젝트를 완성하려고 애씀.', criticalHint: '외로운 군사가 힘껏 싸움.', difficulty: 2 },
    { id: 222, word: '괄목상대', meaning: '학식이나 재주가 놀라울 정도로 향상됨.', hanja: '刮目相對', situation: '꼴찌 하던 친구가 전교 1등을 해서 놀람.', criticalHint: '눈을 비비고 상대를 대함.', difficulty: 2 },
    { id: 223, word: '군계일학', meaning: '많은 사람 가운데서 뛰어난 인물.', hanja: '群鷄一鶴', situation: '평범한 사람들 속에 눈에 띄게 뛰어난 한 사람.', criticalHint: '닭 무리 속의 한 마리 학.', difficulty: 2 },
    { id: 224, word: '기상천외', meaning: '사람이 짐작할 수 없을 정도로 엉뚱하고 기발함.', hanja: '奇想天外', situation: '정말 독특하고 기발한 아이디어를 냈을 때.', criticalHint: '생각이 하늘 밖에 있음.', difficulty: 2 },
    { id: 225, word: '노심초사', meaning: '몹시 마음을 쓰며 애를 태움.', hanja: '勞心焦思', situation: '자식이 사고라도 칠까 봐 부모님이 걱정함.', criticalHint: '마음을 수고롭게 하고 생각을 태움.', difficulty: 2 },
    { id: 226, word: '다사다난', meaning: '일도 많고 어려움도 많음.', hanja: '多事多難', situation: '올해는 참 많은 사건 사고가 있었다.', criticalHint: '일도 많고 어려움도 많음.', difficulty: 2 },
    { id: 227, word: '단도직입', meaning: '요점을 바로 풀이하거나 말함.', hanja: '單刀直入', situation: '빙빙 돌리지 말고 본론만 말해라.', criticalHint: '칼 한 자루 들고 바로 들어감.', difficulty: 2 },
    { id: 228, word: '대동소이', meaning: '대부분은 같고 차이는 거의 없음.', hanja: '大同小異', situation: '두 제품의 기능이 거의 비슷할 때.', criticalHint: '크게 같고 작게 다름.', difficulty: 2 },
    { id: 229, word: '독불장군', meaning: '남의 의견을 무시하고 혼자 모든 일을 처리하는 사람.', hanja: '獨不將軍', situation: '협력하지 않고 자기 고집대로만 하는 사람.', criticalHint: '혼자서는 장군이 될 수 없음.', difficulty: 2 },
    { id: 230, word: '동상이몽', meaning: '같은 자리에 자면서 다른 꿈을 꾼다. 겉으로는 같이 행동하면서 속으로는 딴생각을 함.', hanja: '同床異夢', situation: '함께 사업을 하지만 서로 목표가 다름.', criticalHint: '같은 침상에서 다른 꿈.', difficulty: 2 },
    { id: 231, word: '마이동풍', meaning: '남의 말을 귀담아듣지 아니하고 흘려버림.', hanja: '馬耳東風', situation: '아무리 충고해도 듣지 않는 고집불통.', criticalHint: '말 귀에 동풍.', difficulty: 2 },
    { id: 232, word: '명실상부', meaning: '이름과 실상이 서로 꼭 맞음.', hanja: '名實相符', situation: '소문대로 역시 실력이 대단할 때.', criticalHint: '이름과 실재가 서로 부합함.', difficulty: 2 },
    { id: 233, word: '무용지물', meaning: '쓸모없는 물건이나 사람.', hanja: '無用之物', situation: '비싸게 샀는데 전혀 쓰지 않는 운동기구.', criticalHint: '쓸모없는 물건.', difficulty: 2 },
    { id: 234, word: '배은망덕', meaning: '남에게 입은 은혜를 저버리고 배신함.', hanja: '背恩忘德', situation: '도와줬더니 오히려 화를 내는 사람.', criticalHint: '은혜를 등지고 덕을 잊음.', difficulty: 2 },
    { id: 235, word: '복지부동', meaning: '땅에 엎드려 움직이지 않음. 주어진 일만 처리하고 나서지 않음.', hanja: '伏地不動', situation: '공무원이 새로운 일을 하지 않고 몸만 사릴 때.', criticalHint: '땅에 엎드려 움직이지 않음.', difficulty: 2 },
    { id: 236, word: '부화뇌동', meaning: '줏대 없이 남의 의견에 따라 움직임.', hanja: '附和雷同', situation: '친구들이 하니까 나도 따라서 할 때.', criticalHint: '우레 소리에 맞춰 함께 함.', difficulty: 2 },
    { id: 237, word: '불철주야', meaning: '밤낮을 가리지 않고 힘써 일하거나 공부함.', hanja: '不撤晝夜', situation: '성공을 위해 밤낮없이 일할 때.', criticalHint: '낮과 밤을 가리지 않음.', difficulty: 2 },
    { id: 238, word: '사서고생', meaning: '하지 않아도 될 고생을 일부러 함.', hanja: '買苦', situation: '편한 길 놔두고 힘든 길을 택할 때.', criticalHint: '고생을 사서 함.', difficulty: 2 },
    { id: 239, word: '살신성인', meaning: '자기 몸을 희생하여 인을 이룸.', hanja: '殺身成仁', situation: '남을 구하기 위해 목숨을 바친 영웅.', criticalHint: '몸을 죽여 인을 이룸.', difficulty: 2 },
    { id: 240, word: '소탐대실', meaning: '작은 것을 탐하다가 큰 것을 잃음.', hanja: '小貪大失', situation: '몇 푼 아끼려다 건강을 해쳤을 때.', criticalHint: '작은 것을 탐하다 큰 것을 잃음.', difficulty: 2 },
    { id: 241, word: '솔선수범', meaning: '남보다 앞장서서 모범을 보임.', hanja: '率先垂範', situation: '리더가 먼저 청소하는 모습을 보일 때.', criticalHint: '앞장서서 모범을 드리움.', difficulty: 2 },
    { id: 242, word: '시기상조', meaning: '어떤 일을 하기에 아직 때가 이르지 않음.', hanja: '時機尙早', situation: '지금 발표하기에는 아직 준비가 덜 되었을 때.', criticalHint: '때와 기회가 아직 이름.', difficulty: 2 },
    { id: 243, word: '심기일전', meaning: '어떤 동기로 마음을 새롭게 먹음.', hanja: '心機一轉', situation: '실패를 딛고 다시 시작하려는 마음가짐.', criticalHint: '마음의틀을 한 번 바꿈.', difficulty: 2 },
    { id: 244, word: '애지중지', meaning: '매우 사랑하고 소중히 여기는 모양.', hanja: '愛之重之', situation: '아끼는 물건을 다룰 때.', criticalHint: '사랑하고 또 소중히 함.', difficulty: 2 },
    { id: 245, word: '약육강식', meaning: '약한 자가 강한 자에게 먹힘.', hanja: '弱肉强食', situation: '강한 팀만이 살아남는 치열한 경쟁 사회.', criticalHint: '약한 고기는 강한 자의 밥.', difficulty: 2 },
    { id: 246, word: '어부지리', meaning: '두 사람이 맞붙어 싸우는 바람에 엉뚱한 제3자가 이익을 챙김.', hanja: '漁父之利', situation: '두 경쟁자가 싸우다 둘 다 망하고 다른 업체가 1등함.', criticalHint: '어부의 이익.', difficulty: 2 },
    { id: 247, word: '오합지졸', meaning: '규율도 없이 모인 어중이떠중이의 무리.', hanja: '烏合之卒', situation: '훈련되지 않은 군대나 팀.', criticalHint: '까마귀가 모인 듯한 병사.', difficulty: 2 },
    { id: 248, word: '용두사미', meaning: '시작은 거창하나 끝이 흐지부지함.', hanja: '龍頭蛇尾', situation: '처음에는 의욕적이었으나 흐지부지 끝남.', criticalHint: '용의 머리에 뱀의 꼬리.', difficulty: 2 },
    { id: 249, word: '우이독경', meaning: '아무리 가르치고 일러 주어도 알아듣지 못함.', hanja: '牛耳讀經', situation: '말 안 통하는 사람에게 설명할 때.', criticalHint: '소 귀에 경 읽기.', difficulty: 2 },
    { id: 250, word: '인과응보', meaning: '행위의 결과에 따라 보답을 받음.', hanja: '因果應報', situation: '착한 일 하면 복 받고 나쁜 일 하면 벌 받음.', criticalHint: '원인과 결과에 응하여 갚음.', difficulty: 2 },
    { id: 251, word: '일망타진', meaning: '한 번에 모조리 다 잡음.', hanja: '一網打盡', situation: '경찰이 범죄 조직을 한 번에 소탕함.', criticalHint: '한 그물로 다 잡음.', difficulty: 2 },
    { id: 252, word: '일일삼추', meaning: '하루가 삼 년 같다는 뜻으로, 몹시 애태우며 기다림.', hanja: '一日三秋', situation: '기다리는 시간이 너무 느리게 갈 때.', criticalHint: '하루가 세 번의 가을 같음.', difficulty: 2 },
    { id: 253, word: '전화위복', meaning: '화가 바뀌어 오히려 복이 됨.', hanja: '轉禍爲福', situation: '실패했던 경험 덕분에 더 큰 성공을 거둠.', criticalHint: '화를 굴려 복을 만듦.', difficulty: 2 },
    { id: 254, word: '주객전도', meaning: '주인과 손님의 위치가 서로 뒤바뀜.', hanja: '主客顚倒', situation: '도와주러 온 사람이 주인 행세를 할 때.', criticalHint: '주인과 손님이 뒤집힘.', difficulty: 2 },
    { id: 255, word: '진퇴양난', meaning: '이러지도 저러지도 못하는 난처한 처지.', hanja: '進退兩難', situation: '나아갈 수도 없고 물러설 수도 없는 상황.', criticalHint: '나아가기도 물러나기도 둘 다 어려움.', difficulty: 2 },

    // ==================================================================
    // LEVEL 3: Advanced (Stages 8-10) - Total 50 items
    // ==================================================================
    { id: 301, word: '토사구팽', meaning: '필요할 때는 쓰고 필요 없을 때는 야박하게 버림.', hanja: '兔死狗烹', situation: '이용만 당하고 버림받았을 때.', criticalHint: '토끼가 잡히면 사냥개를 삶는다.', difficulty: 3 },
    { id: 302, word: '교언영색', meaning: '아첨하는 말과 알랑거리는 태도.', hanja: '巧言令色', situation: '속마음은 다르면서 겉으로만 번지르르하게 말할 때.', criticalHint: '교묘한 말과 꾸민 얼굴빛.', difficulty: 3 },
    { id: 303, word: '각주구검', meaning: '융통성 없이 현실에 맞지 않는 낡은 생각을 고집함.', hanja: '刻舟求劍', situation: '세상이 변했는데 옛날 방식만 고집하는 사람.', criticalHint: '배에 금을 그어 칼을 찾다.', difficulty: 3 },
    { id: 304, word: '배수지진', meaning: '더 이상 물러설 곳이 없어 목숨을 걸고 싸움.', hanja: '背水之陣', situation: '이번 시험에 떨어지면 끝이라는 각오로 임함.', criticalHint: '물을 등지고 진을 치다.', difficulty: 3 },
    { id: 305, word: '사면초가', meaning: '아무에게도 도움을 받지 못하는 외롭고 곤란한 지경.', hanja: '四面楚歌', situation: '주변 모두가 적이고 도망칠 곳도 없을 때.', criticalHint: '사방에서 들려오는 초나라의 노래.', difficulty: 3 },
    { id: 306, word: '와신상담', meaning: '원수를 갚거나 마음먹은 일을 이루기 위하여 괴로움을 참고 견딤.', hanja: '臥薪嘗膽', situation: '복수를 다짐하며 힘든 시간을 견딜 때.', criticalHint: '장작 위에 눕고 쓸개를 맛보다.', difficulty: 3 },
    { id: 307, word: '조삼모사', meaning: '당장 눈앞의 차이만 알고 결과가 같음을 모르는 어리석음.', hanja: '朝三暮四', situation: '월급을 아침에 주나 저녁에 주나 똑같은데 화내는 상황.', criticalHint: '아침에 세 개, 저녁에 네 개.', difficulty: 3 },
    { id: 308, word: '지록위마', meaning: '윗사람을 농락하여 권세를 마음대로 함.', hanja: '指鹿爲馬', situation: '거짓말을 사실처럼 강요하여 남을 속일 때.', criticalHint: '사슴을 가리켜 말이라 하다.', difficulty: 3 },
    { id: 309, word: '표리부동', meaning: '마음이 음흉하고 불량하여 겉과 속이 다름.', hanja: '表裏不同', situation: '앞에서는 칭찬하고 뒤에서는 욕하는 사람.', criticalHint: '겉과 속이 같지 않음.', difficulty: 3 },
    { id: 310, word: '호가호위', meaning: '남의 권세를 빌려 위세를 부림.', hanja: '狐假虎威', situation: '부장님 빽만 믿고 설치는 신입사원.', criticalHint: '여우가 호랑이의 위세를 빌리다.', difficulty: 3 },
    { id: 311, word: '결자해지', meaning: '일을 저지른 사람이 그 일을 해결해야 함.', hanja: '結者解之', situation: '네가 벌인 일이니 네가 수습해라.', criticalHint: '맺은 사람이 풀어야 한다.', difficulty: 3 },
    { id: 312, word: '망양지탄', meaning: '학문의 길이 여러 갈래라 진리를 찾기 어려움.', hanja: '亡羊之歎', situation: '너무 선택지가 많아 무엇을 해야 할지 모를 때.', criticalHint: '달아난 양을 보고 탄식함.', difficulty: 3 },
    { id: 313, word: '수주대토', meaning: '한 가지 일에만 얽매여 발전을 모르는 어리석음.', hanja: '守株待兔', situation: '우연한 행운만 기다리며 노력하지 않을 때.', criticalHint: '그루터기를 지키며 토끼를 기다림.', difficulty: 3 },
    { id: 314, word: '안하무인', meaning: '방자하고 교만하여 다른 사람을 업신여김.', hanja: '眼下無人', situation: '눈 아래에 사람이 없는 것처럼 거만하게 행동함.', criticalHint: '눈 아래 사람이 없다.', difficulty: 3 },
    { id: 315, word: '함흥차사', meaning: '한번 간 사람이 소식이 없거나 돌아오지 않음.', hanja: '咸興差使', situation: '심부름 간 사람이 한참 동안 돌아오지 않을 때.', criticalHint: '함흥으로 보낸 사신.', difficulty: 3 },
    { id: 316, word: '후안무치', meaning: '뻔뻔스러워 부끄러움이 없음.', hanja: '厚顔無恥', situation: '잘못을 저지르고도 전혀 미안한 기색이 없음.', criticalHint: '얼굴이 두꺼워 부끄러움이 없다.', difficulty: 3 },
    { id: 317, word: '감탄고토', meaning: '달면 삼키고 쓰면 뱉음. 자신의 이익에 따라서만 행동함.', hanja: '甘呑苦吐', situation: '자기 필요할 때만 찾고 불리하면 모른 척함.', criticalHint: '달면 삼키고 쓰면 뱉는다.', difficulty: 3 },
    { id: 318, word: '자포자기', meaning: '절망 상태에 빠져 자신을 스스로 포기하고 돌아보지 않음.', hanja: '自暴自棄', situation: '실패를 겪고 모든 노력을 포기해버릴 때.', criticalHint: '스스로 해치고 스스로 버림.', difficulty: 3 },
    { id: 319, word: '가렴주구', meaning: '가혹하게 세금을 거두거나 백성의 재물을 억지로 빼앗음.', hanja: '苛斂誅求', situation: '독재 정권이 국민들의 고혈을 짜낼 때.', criticalHint: '가혹하게 거두고 죽일 듯이 구함.', difficulty: 3 },
    { id: 320, word: '각골난망', meaning: '남에게 입은 은혜가 뼈에 사무쳐 잊혀지지 않음.', hanja: '刻骨難忘', situation: '어려울 때 도와준 은혜를 평생 잊지 않겠다.', criticalHint: '뼈에 새겨 잊기 어려움.', difficulty: 3 },
    { id: 321, word: '거두절미', meaning: '머리와 꼬리를 잘라 버림. 요점만 말함.', hanja: '去頭截尾', situation: '변명하지 말고 핵심만 이야기해라.', criticalHint: '머리를 자르고 꼬리를 자름.', difficulty: 3 },
    { id: 322, word: '건곤일척', meaning: '운명을 걸고 단판걸이로 승부를 겨룸.', hanja: '乾坤一擲', situation: '회사의 운명을 건 마지막 승부수.', criticalHint: '하늘과 땅을 건 한 번의 던짐.', difficulty: 3 },
    { id: 323, word: '견강부회', meaning: '이치에 닿지 않는 말을 억지로 끌어다 붙여 조건에 맞추려고 함.', hanja: '牽强附會', situation: '전혀 상관없는 논리를 억지로 연결할 때.', criticalHint: '굳세게 끌어다가 붙여 모음.', difficulty: 3 },
    { id: 324, word: '경거망동', meaning: '경솔하고 조심성 없이 행동함.', hanja: '輕擧妄動', situation: '상황 파악 못 하고 가볍게 처신할 때.', criticalHint: '가볍게 들고 망령되게 움직임.', difficulty: 3 },
    { id: 325, word: '고립무원', meaning: '고립되어 구원 받을 데가 없음.', hanja: '孤立無援', situation: '적진 한가운데 갇혀 아무런 도움도 못 받을 때.', criticalHint: '홀로 서서 도울 데가 없음.', difficulty: 3 },
    { id: 326, word: '고장난명', meaning: '손바닥도 마주쳐야 소리가 난다. 혼자서는 일을 이루기 어려움.', hanja: '孤掌難鳴', situation: '혼자서 아무리 주장해도 상대가 없으면 싸움이 안 됨.', criticalHint: '외손바닥은 울리기 어렵다.', difficulty: 3 },
    { id: 327, word: '곡학아세', meaning: '학문을 굽혀 세상에 아첨함.', hanja: '曲學阿世', situation: '지식인이 권력에 빌붙어 궤변을 늘어놓을 때.', criticalHint: '학문을 굽혀 세상에 아부함.', difficulty: 3 },
    { id: 328, word: '과대망상', meaning: '사실보다 과장하여 터무니없는 헛된 생각을 함.', hanja: '誇大妄想', situation: '자신이 세상을 구할 영웅이라고 착각함.', criticalHint: '크게 자랑하고 망령되게 생각함.', difficulty: 3 },
    { id: 329, word: '관포지교', meaning: '매우 친한 친구 사이의 사귐.', hanja: '管鮑之交', situation: '서로 목숨도 내줄 수 있는 절친한 사이.', criticalHint: '관중과 포숙의 사귐.', difficulty: 3 },
    { id: 330, word: '구밀복검', meaning: '입에는 꿀을 바르고 뱃속에는 칼을 품음.', hanja: '口蜜腹劍', situation: '앞에서는 웃지만 속으로는 해칠 마음을 품음.', criticalHint: '입에는 꿀, 배에는 칼.', difficulty: 3 },
    { id: 331, word: '난형난제', meaning: '누구를 형이라 하고 누구를 아우라 하기 어렵다. 우열을 가리기 어려움.', hanja: '難兄難弟', situation: '두 선수의 실력이 너무 비슷해 승부를 알 수 없음.', criticalHint: '형이라 하기도 어렵고 아우라 하기도 어려움.', difficulty: 3 },
    { id: 332, word: '내우외환', meaning: '나라 안의 근심과 밖의 근심.', hanja: '內憂外患', situation: '집안 문제와 회사 문제가 동시에 터졌을 때.', criticalHint: '안의 근심과 밖의 근심.', difficulty: 3 },
    { id: 333, word: '논공행상', meaning: '공로를 의논하여 상을 줌.', hanja: '論功行賞', situation: '프로젝트 성공 후 기여도에 따라 보너스를 줄 때.', criticalHint: '공을 논하고 상을 행함.', difficulty: 3 },
    { id: 334, word: '누란지위', meaning: '알을 쌓아 놓은 듯한 위태로운 형세.', hanja: '累卵之危', situation: '언제 무너질지 모르는 매우 위험한 상황.', criticalHint: '알을 쌓아 놓은 위태로움.', difficulty: 3 },
    { id: 335, word: '당랑거철', meaning: '제 분수도 모르고 강한 상대에게 덤벼듦.', hanja: '螳螂拒轍', situation: '사마귀가 수레바퀴를 막아서는 격.', criticalHint: '사마귀가 수레바퀴에 맞섬.', difficulty: 3 },
    { id: 336, word: '도원결의', meaning: '뜻이 맞는 사람끼리 하나의 목적을 위해 행동을 같이 할 것을 약속함.', hanja: '桃園結義', situation: '동업자들이 의기투합하여 성공을 다짐함.', criticalHint: '복숭아밭에서 의형제를 맺음.', difficulty: 3 },
    { id: 337, word: '등하불명', meaning: '등잔 밑이 어둡다. 가까이 있는 것을 오히려 모름.', hanja: '燈下不明', situation: '범인은 바로 옆에 있었다.', criticalHint: '등잔 아래가 밝지 않음.', difficulty: 3 },
    { id: 338, word: '마역이효', meaning: '말을 바꾸어 타는 것이 이롭다. 상황에 따라 방법을 바꾸는 것이 좋음.', hanja: '馬易而孝', situation: '때로는 융통성 있게 대처하는 것이 현명하다.', criticalHint: '말을 바꾸어 타는 것이 낫다.', difficulty: 3 },
    { id: 339, word: '맹모삼천', meaning: '교육 환경의 중요성.', hanja: '孟母三遷', situation: '자녀 교육을 위해 학군 좋은 곳으로 이사 갈 때.', criticalHint: '맹자 어머니가 세 번 이사함.', difficulty: 3 },
    { id: 340, word: '면종복배', meaning: '앞에서는 복종하는 체하고 뒤에서는 배신함.', hanja: '面從腹背', situation: '앞에선 예스맨, 뒤에선 딴소리.', criticalHint: '얼굴로는 따르나 배로는 등짐.', difficulty: 3 },
    { id: 341, word: '명약관화', meaning: '불을 보듯 분명하고 뻔함.', hanja: '明若觀火', situation: '결과가 너무나 뻔해서 의심할 여지가 없음.', criticalHint: '불을 보는 것과 같이 밝음.', difficulty: 3 },
    { id: 342, word: '목불인견', meaning: '눈앞의 광경을 차마 눈 뜨고 볼 수 없음.', hanja: '目不忍見', situation: '참혹한 사고 현장을 보고 고개를 돌림.', criticalHint: '눈으로 차마 볼 수 없음.', difficulty: 3 },
    { id: 343, word: '무위도식', meaning: '하는 일 없이 놀고먹음.', hanja: '無爲徒食', situation: '직장도 안 구하고 집에서 빈둥거릴 때.', criticalHint: '하는 것 없이 헛되이 밥만 먹음.', difficulty: 3 },
    { id: 344, word: '물아일체', meaning: '자연물과 자아가 하나가 된 상태.', hanja: '物我一體', situation: '자연 풍경에 푹 빠져 시간 가는 줄 모름.', criticalHint: '사물과 내가 한 몸이 됨.', difficulty: 3 },
    { id: 345, word: '미봉책', meaning: '눈가림만 하는 일시적인 대책.', hanja: '彌縫策', situation: '근본적인 해결 없이 임시방편으로 때움.', criticalHint: '꿰매어 깁는 계책.', difficulty: 3 },
    { id: 346, word: '백척간두', meaning: '매우 위태롭고 어려운 지경.', hanja: '百尺竿頭', situation: '절벽 끝에 선 듯한 위기 상황.', criticalHint: '백 자나 되는 장대 끝.', difficulty: 3 },
    { id: 347, word: '부창부수', meaning: '남편이 주장하고 아내가 이에 따름. 부부의 화합.', hanja: '夫唱婦隨', situation: '부부가 뜻이 잘 맞아 함께 일을 잘해 나감.', criticalHint: '지아비가 부르고 지어미가 따름.', difficulty: 3 },
    { id: 348, word: '비분강개', meaning: '의롭지 못한 일에 대하여 분개함.', hanja: '悲憤慷慨', situation: '부조리한 사회 현실을 보고 분통을 터뜨림.', criticalHint: '슬프고 분하여 마음이 북받침.', difficulty: 3 },
    { id: 349, word: '사필귀정', meaning: '모든 일은 반드시 바른길로 돌아감.', hanja: '事必歸正', situation: '억울한 누명이 결국 벗겨졌을 때.', criticalHint: '일은 반드시 바른 곳으로 돌아감.', difficulty: 3 },
    { id: 350, word: '읍참마속', meaning: '대의를 위해서라면 아끼는 사람도 버림.', hanja: '泣斬馬謖', situation: '규율을 어긴 아끼는 부하를 눈물을 머금고 처벌함.', criticalHint: '울면서 마속을 벰.', difficulty: 3 }
  ];

  // Helper to get questions for a stage
  getQuestionsForStage(stage: number): Idiom[] {
    // Determine difficulty based on stage
    // Stage 1-3: Difficulty 1
    // Stage 4-7: Difficulty 2
    // Stage 8-10: Difficulty 3
    let targetDiff = 1;
    if (stage >= 4) targetDiff = 2;
    if (stage >= 8) targetDiff = 3;

    // Filter items.
    let pool = this.idioms.filter(i => i.difficulty === targetDiff);
    
    // Fallback if pool is small (just in case), add lower difficulty items to avoid crash
    if (pool.length < 5) {
       const easier = this.idioms.filter(i => i.difficulty < targetDiff);
       pool = [...pool, ...easier];
    }
    
    // Shuffle and pick 5
    return this.shuffle(pool).slice(0, 5);
  }

  // Generate wrong answers from the entire pool excluding the correct one
  getDistractors(correctId: number, count: number = 3): string[] {
    // Get item to know its difficulty
    const currentItem = this.idioms.find(i => i.id === correctId);
    let others: Idiom[] = [];
    
    if (currentItem) {
        // Try to get distractors of similar difficulty first
        others = this.idioms.filter(i => i.id !== correctId && i.difficulty === currentItem.difficulty);
        
        // If not enough similar difficulty items (unlikely now), expand search
        if (others.length < count) {
            others = this.idioms.filter(i => i.id !== correctId);
        }
    } else {
        others = this.idioms.filter(i => i.id !== correctId);
    }

    const shuffled = this.shuffle(others);
    return shuffled.slice(0, count).map(i => i.word);
  }

  // Helper to find single item by ID
  getIdiom(id: number): Idiom | undefined {
    return this.idioms.find(i => i.id === id);
  }

  private shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
