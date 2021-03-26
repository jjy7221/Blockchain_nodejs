var subjnames={
    c_score:'C 언어',
    js_score:'JavaScript',
    python:'Python',
    sql:'DataBase'
}

function Student(name){
    this.name=name;
    this.scores={}

    this.set_scores=function(){
        for (let key in subjnames){
           
            this.scores[key]=Math.floor(Math.random()*100);
        }
    }
    this.getAvg=()=>{
        let sum=0;
        let cnt=0;
        for (let key in this.scores){
            sum+=this.scores[key];
            cnt++;
        }
        return Math.floor(sum/cnt);
    }

    this.print=function(){
        console.log(`이름 : ${name}`);
        for (let key in subjnames){
            console.log(`${subjnames[key]} : ${this.scores[key]}`)
        }
        console.log(`과목 평균 : ${this.getAvg()}`);
        console.log(`-------------------------------------------`);
    }
}

// 컨테이너 클래스같은 개념 생각하고 맹글은 거
function BC401() {
    this.Students=[];

    this.Initstudent=function() {
        let name=['지년공주','양지웅','진주공주?','이인재','양동열','김민서','여진공주','말청우','해리미누나']
        for(var i=0; i<name.length;i++){
            this.Students[i]=new Student(name[i]);
            this.Students[i].set_scores();
        }
    }

    this.Showstudent = () => {
      // 배열 >> foreach 반복문(Array전용인 듯?) or for...of 반복문
      // 계속 for...in 썼다가 안 돼서 A4다 꾸김
      for(let a of this.Students){
        console.log(`${Object.keys(a)[0]} : ${a.name}`);
        console.log(`${Object.keys(a)[1]}`);
        // 객체 >> for...in
        // 객체의 key값과 value를 뽑아내는데 유용하다
        for(let b in a.scores){
          if(b == `sql`){
            // process.stdout.write(); -> 현재 출력 되는 줄에서 출력을 할 수 있는 출력 함수
            process.stdout.write(`${subjnames[b]} : ${a.scores[b]}`);
            break;
          }
          process.stdout.write(`${subjnames[b]} : ${a.scores[b]}, `);
        }
        console.log(`\n`);
      }
    }

    this.FindMin = (subj) =>{
        var loser = this.Students[0];

        for(let min of this.Students){
            if(min.scores[subj] < loser.scores[subj]){
                loser = min;
            }
        }
        console.log(`'${subjnames[subj]}'의 최저점은 ${loser.scores[subj]}점으로`);
        console.log(`>>>>>${loser.name} 입니다.\n`);
    }

    this.FindMax = (subj) =>{
        var winner = this.Students[0];

        for(let max of this.Students){
            if(max.scores[subj] > winner.scores[subj]){
                winner = max;
            }
        }
        console.log(`'${subjnames[subj]}'의 최고점은 ${winner.scores[subj]}점으로`);
        console.log(`>>>>>${winner.name} 입니다.\n`);
 
    }

}

let BCmate = new BC401;

BCmate.Initstudent();

BCmate.Showstudent();

// 출력 방법 1) - 이거 `` 안 붙여 주면 안 돌아감 이거 때문에 욕하다가 등짝 스매싱
BCmate.FindMax(`c_score`);
BCmate.FindMax(`js_score`);
BCmate.FindMax(`python`);

// 출력 방법 2) - Object 메소드 사용 >> 필요한 기능이 있는지 검색을 생활화하자..
BCmate.FindMax(Object.keys(subjnames)[0]);
BCmate.FindMax(Object.keys(subjnames)[1]);
BCmate.FindMax(Object.keys(subjnames)[2]);

// 출력 방법 3) - for...in으로 키 값 넣어주기
for(let key in subjnames){

  BCmate.FindMax(key);

  BCmate.FindMin(key);
}