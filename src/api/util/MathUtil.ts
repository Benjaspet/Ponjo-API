export default class MathUtil {

    public static isPrime(number: number): boolean {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) return false;
        }
        return number > 1;
    }
}