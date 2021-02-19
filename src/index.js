module.exports = function toReadable(number) {
    if (number === undefined) {
        return '';
    }

    const humanNumber = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        teen: function (n) {
            switch (n) {
                case 1:
                    return 'eleven';
                case 2:
                    return 'twelve';
                case 3:
                    return 'thirteen';
                case 5:
                    return 'fifteen';
                case 8:
                    return 'eighteen';
                default:
                    return this[n] + 'teen';
            }
        },
        decimal: function (n) {
            switch (n) {
                case 2:
                    return 'twenty';
                case 3:
                    return 'thirty';
                case 4:
                    return 'forty';
                case 5:
                    return 'fifty';
                case 8:
                    return 'eighty';
                default:
                    return this[n] + 'ty';
            }
        },
        hundred: function (n) {
            return this[n] + ' hundred';
        }
    };

    if (number <= 10) {
        return humanNumber[number];
    } else if (number < 100) {

        if (number < 20) {
            return humanNumber.teen(number % 10);
        }

        return number % 10 === 0
            ? humanNumber.decimal(number / 10)
            : humanNumber.decimal(Math.floor(number / 10))
              + ' '
              + humanNumber[number % 10];

    } else if (number < 1000) {

        if (number % 100 === 0) {
            return humanNumber.hundred(number / 100);
        }

        if (number % 100 <= 10) {

            return humanNumber.hundred(Math.floor(number / 100))
                   + ' '
                   + humanNumber[number % 100];

        } else if (number % 100 < 20) {

            return humanNumber.hundred(Math.floor(number / 100))
                + ' '
                + humanNumber.teen(
                    Math.floor(
                        Math.floor(number % 100) % 10
                    )
                );

        } else {

            return humanNumber.hundred(Math.floor(number / 100))
                + ' '
                + humanNumber.decimal(
                    Math.floor(
                        Math.floor(number % 100) / 10
                    )
                )
                + (number % 100 % 10
                  ? ' ' + humanNumber[
                      Math.floor(
                         Math.floor(number % 100) % 10
                      )
                    ]
                  : '');
        }
    }
}
