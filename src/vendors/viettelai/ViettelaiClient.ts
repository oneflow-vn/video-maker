
import axios, { Axios } from 'axios';
import fs from 'fs';
import rateLimit from 'axios-rate-limit';

// **4\. Danh sách giọng đọc**

// | **#** | **Name**     | **Description** | **Code**       |
// | ----- | ------------ | --------------- | -------------- |
// | 1     | Quỳnh Anh    | Nữ miền Bắc     | hn-quynhanh    |
// | 2     | Diễm My      | Nữ miền Nam     | hcm-diemmy     |
// | 3     | Mai Ngọc     | Nữ miền Trung   | hue-maingoc    |
// | 4     | Phương Trang | Nữ miền Bắc     | hn-phuongtrang |
// | 5     | Thảo Chi     | Nữ miền Bắc     | hn-thaochi     |
// | 6     | Thanh Hà     | Nữ miền Bắc     | hn-thanhha     |
// | 7     | Phương Ly    | Nữ miền Nam     | hcm-phuongly   |
// | 8     | Thùy Dung    | Nữ miền Nam     | hcm-thuydung   |
// | 9     | Thanh Tùng   | Nam miền Bắc    | hn-thanhtung   |
// | 10    | Bảo Quốc     | Nam miền Trung  | hue-baoquoc    |
// | 11    | Minh Quân    | Nam miền Nam    | hcm-minhquan   |
// | 12    | Thanh Phương | Nữ miền Bắc     | hn-thanhphuong |
// | 13    | Nam Khánh    | Nam miền Bắc    | hn-namkhanh    |
// | 14    | Lê Yến       | Nữ miền Nam     | hn-leyen       |
// | 15    | Tiến Quân    | Nam miền Bắc    | hn-tienquan    |
// | 16    | Thùy Duyên   | Nữ miền Nam     | hcm-thuyduyen  |

export type Voice = 'hn-quynhanh' | 'hcm-diemmy' | 'hue-maingoc' | 'hn-phuongtrang' | 'hn-thaochi' | 'hn-thanhha' | 'hcm-phuongly' | 'hcm-thuydung' | 'hn-thanhtung' | 'hue-baoquoc' | 'hcm-minhquan' | 'hn-thanhphuong' | 'hn-namkhanh' | 'hn-leyen' | 'hn-tienquan' | 'hcm-thuyduyen';

//  Điều chỉnh tốc độ giọng nói. 0.8: tốc độ chậm nhất 0.9 1.0: tốc độ bình thường 1.1 1.2: tốc độ nhanh nhất 

export type Speed = 0.8 | 0.9 | 1.0 | 1.1 | 1.2;

//  Định dạng file âm thanh trả ra: 1: streaming 2: wav 3: mp3.                               

export enum TtsReturnOption {
    STREAMING = 1,
    WAV = 2,
    MP3 = 3
}

type SynthesizeOptions = {
    text: string;
    voice: Voice;
    speed: Speed;
    tts_return_option: TtsReturnOption;
    token?: string;
    without_filter: boolean;
};

class ViettelaiClient {
    private token: string;
    private axios: Axios;

    constructor(token: string) {
        this.token = token;

        const axiosInstance = axios.create({
            baseURL: 'https://viettelai.vn',
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            headers: {
                'accept': '*/*',
                'User-Agent': 'curl/7.64.1',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'identity'
            }
        });

        this.axios = rateLimit(axiosInstance, {
            maxRequests: 1,
            perMilliseconds: 5000
        });
    }

    /**
     * Synthesize text to speech
     * @param oprions 
     * @returns file blob
     */
    public async synthesize(oprions: SynthesizeOptions): Promise<Blob> {
        const response = await this.axios.post('/tts/speech_synthesis', oprions, {
            responseType: 'blob',
        }).catch(error => {
            console.error(error.config.headers);
            throw new Error('Failed to synthesize text to speech');
        });

        return response.data;
    }

    /**
     * Synthesize text to speech and save to file
     * @param oprions
     * @param path
     * @returns
     * @returns file path
    */
    public async synthesizeToFile(oprions: SynthesizeOptions, path: string): Promise<string> {
        const response = await this.axios.post('/tts/speech_synthesis', oprions, {
            responseType: 'stream',
            validateStatus: (status) => status < 500
        });

        if (response.status !== 200) {
            console.error(response.data);
            console.error(response.headers);
            throw new Error('Failed to synthesize text to speech');
        }
        
        return new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(path);

            writer.on('finish', () => {
                console.log('File saved to', path);
                resolve(path);
            });

            writer.on('error', (err) => {
                reject(err);
            });

            response.data.pipe(writer);
        });
    }
}


export default ViettelaiClient;
