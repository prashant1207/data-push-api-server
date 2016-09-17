var method = cityAppHelper.prototype;

function cityAppHelper() {
}

method.generateFileName = function (department) {
    if (department != null) {
        return getAcronym(department) + getUNIXTimestamp();// + ".txt";
    }
    else {
        return "nullcalls_" + getUNIXTimestamp();// + ".txt";
    }

};

function getAcronym(s){
    var words, acronym, nextWord;

    words = s.split(' ');
    acronym= "";
    index = 0
    while (index<words.length) {
            nextWord = words[index];
            acronym = acronym + nextWord.charAt(0);
            index = index + 1 ;
    }
    return acronym;
}

function getUNIXTimestamp() {
    return Math.floor(Date.now() / 1000);
}

module.exports = cityAppHelper;