interface Mask<T> {
    mask: T;
}

export interface MaskConfig {
    cardNumberMask: Mask<string>,
    sumMask: Mask<Number>
}