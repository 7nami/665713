```javascript
    //找出数组中重复元素
    function findDuplicates(arr) {
        var duplicates = [];
        var seen = {};
        for (var i = 0; i < arr.length; i++) {
            var currentItem = arr[i];
            if (seen[currentItem] === undefined) {
                seen[currentItem] = 1;
            } else {
                if (seen[currentItem] === 1) {
                    duplicates.push(currentItem);
                }
                seen[currentItem]++
            }
        }
        return duplicates;
    }
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(findDuplicates(arr));
```

