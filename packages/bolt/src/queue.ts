import { Queue } from "bullmq";
import { connection } from "./env";
import type { Input, PartialInput, PartialStream, Stream } from "./types";

export interface TranscodeData {
  assetId: string;
  inputs: PartialInput[];
  streams: PartialStream[];
  segmentSize: number;
  packageAfter?: boolean;
  group?: string;
}

export const transcodeQueue = new Queue<TranscodeData>("transcode", {
  connection,
});

export interface PackageData {
  assetId: string;
  language?: string;
  segmentSize?: number;
  name: string;
}

export const packageQueue = new Queue<PackageData>("package", {
  connection,
});

export interface FfmpegData {
  input: Input;
  stream: Stream;
  segmentSize: number;
  assetId: string;
  parentSortIndex: number;
}

export const ffmpegQueue = new Queue<FfmpegData>("ffmpeg", {
  connection,
});

export interface FfprobeData {
  inputs: PartialInput[];
  parentSortIndex: number;
}

export const ffprobeQueue = new Queue<FfprobeData>("ffprobe", {
  connection,
});

export type OutcomeData =
  | {
      type: "transcode";
      data: TranscodeData;
    }
  | {
      type: "package";
      data: PackageData;
    };

export const outcomeQueue = new Queue<OutcomeData>("outcome", {
  connection,
});