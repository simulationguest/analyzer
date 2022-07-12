export interface RawDatapoint {
    time: Date,
    raw_adc_value: BigInt,
}

export interface RawChunk {
    pin: number,
    ro: BigInt,
    data: RawDatapoint[],
}

export const parse = (str: string): RawChunk[] => {
    const parts = str.trim().split("\n");

    let chunks: RawChunk[] = [];

    for (let part of parts) {
        const pair = part.split(":");
        const first = pair[0];
        const second = pair[1];
        
        if (part[0] === "|") {
            chunks.push({
                pin: parseInt(first.slice(1)),
                ro: BigInt(second),
                data: []
            });
        } else {
            if (chunks.length === 0) {
                throw "Invalid file format"
            }
            chunks[chunks.length-1].data.push({
                time: new Date(parseInt(first)),
                raw_adc_value: BigInt(second),
            });
        }
    }

    return chunks;
}

export const curves = {
    LPG: [2.3,0.21,-0.47],
    CO: [2.3,0.72,-0.34],
    Smoke: [2.3,0.53,-0.44]
}

type curve = number[]

export const calculate = (c: curve) => {

}