export default class MathUtil {

    /*
     Determines whether a number is prime or not.
     @param number: number
     @return bool
     */

    public static isPrime(number: number): boolean {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) return false;
        }
        return number > 1;
    }
}