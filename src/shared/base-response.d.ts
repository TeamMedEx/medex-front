export type BaseResponse = {
    meta: Meta;
    data: object[] | object;
};

interface Meta {
    status: number;
    message: string;
}
