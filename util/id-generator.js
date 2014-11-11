var idGenerator = function(seed) {

    var idNumber = seed || 0;

    var id = { };

    id.getNextId = function() {
        var nextId = idNumber;
        incrementId();
        return nextId;
    };

    id.resetId = function(newId) {
        idNumber = newId;
    };

    var incrementId = function() {
        idNumber += 1;
    };

    return id;
};

module.exports = idGenerator;
