import { Subtitle } from "./models/Subtitles";
import { productDeveloperSubtitles } from "./productDeveloperSubtitles";

function formatSubtitlesToSRT(subtitles: Subtitle[], language: string | undefined): string {
  let output = "";
  let currentTime = 0;

  subtitles.forEach((subtitle, index) => {
    currentTime += subtitle.leadingBlank; // Add leading blank to current time

    const startTime = formatTime(currentTime);
    currentTime += subtitle.duration; // Add duration to current time
    const endTime = formatTime(currentTime);

    const text = getTextOfSubtitle(subtitle, language);

    output += `${index + 1}\n${startTime} --> ${endTime}\n${text}\n\n`;
  });

  return output;
}

function getTextOfSubtitle(subtitle: Subtitle, language: string | undefined): string {
  const text = language && subtitle?.translations ? subtitle.translations[language] : subtitle.text;
  if (Array.isArray(text)) {
    return text.join('\n');
  }
  return text;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  const millis = Math.floor((seconds % 1) * 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')},${millis.toString().padStart(3, '0')}`;
}


const srtContent = formatSubtitlesToSRT(productDeveloperSubtitles, "")
process.stdout.write(srtContent);



