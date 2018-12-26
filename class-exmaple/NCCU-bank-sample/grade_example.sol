pragma solidity ^0.4.25;

contract GradesContract {
    ///教師為合約擁有者
    address public teacher;
    
    //學生以address array來存放，每個學生地址會對映到一筆成績紀錄
    address[] studentIds;
    mapping (address => Grades) studentGrades;
    
    struct Grades {
        uint ChineseGrade;
        uint EnglishGrade;
        uint MathGrade;
        bool Registered;
    }
    
    ///建構子 定義教師為部屬之地址
    constructor() public {
        teacher = msg.sender;
    }
    
    ///用以檢查教師身份
    function isTeacher() public view returns (bool) {
        return (msg.sender == teacher);
    }
    
    ///用於後面學生查詢成績時，檢查成績是否為學生本人的
    function isGradesOf(address input) public view returns (bool) {
        return (msg.sender == input);
    }

    
    function putGrade(address studentId, uint chineseGrade, uint englishGrade, uint mathGrade) public {
        // check permission
        // only the teacher can call this method
        require(msg.sender == teacher);
        
        // if it is first time registered
        if (studentGrades[studentId].Registered == false) {
            // then add to Ids array for tracking or iterating
            studentIds.push(studentId);
        }
        
        // put to mapping, or if it is already registered then overwrite it
        studentGrades[studentId] = Grades({
            ChineseGrade: chineseGrade,
            EnglishGrade: englishGrade,
            MathGrade:    mathGrade,
            Registered:   true
        });
    }
    
    function getGrade(address studentId) public view returns (uint ChineseGrade, uint EnglishGrade, uint MathGrade) {
        // check permission
        // only the student who owns these grades or the teacher can call this method
        require(isGradesOf(studentId) == true || isTeacher() == true); 
        
        Grades memory theGrades = studentGrades[studentId];
        
        ChineseGrade = theGrades.ChineseGrade;
        EnglishGrade = theGrades.EnglishGrade;
        MathGrade    = theGrades.MathGrade;
    }
    
    
    function getGradesSum(address studentId) public view returns (uint) {
        // check permission
        // only the student who owns these grades or the teacher can call this method
        require(isGradesOf(studentId) == true || isTeacher() == true); 

        Grades memory theGrades = studentGrades[studentId];
        
        return theGrades.ChineseGrade + theGrades.EnglishGrade + theGrades.MathGrade;
    }
    
    function getGradesAverage(address studentId) public view returns (uint) {
        // check permission
        // only the student who owns these grades or the teacher can call this method
        require(isGradesOf(studentId) == true || isTeacher() == true); 

        
        return getGradesSum(studentId) / 3;
    }
    
    function getClassGradesAverage() public view returns (uint) {
        // check permission
        // only the teacher can call this method
        require(msg.sender == teacher);

        // iterate all the grades and calculate its average
        uint sum = 0;
        uint studentNum = studentIds.length;
        for (uint i = 0; i < studentNum; i++) {
            sum = sum + getGradesSum(studentIds[i]);
        }
        
        return (sum / studentNum) / 3;
    }
    
}
