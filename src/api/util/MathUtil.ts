export default class MathUtil {

    /*
     Determines whether a number is prime or not.
     @return bool
     */

    /*
    copyright
     */

    public static isPrime(number: number): boolean {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) return false;
        }
        return number > 1;
    }
}