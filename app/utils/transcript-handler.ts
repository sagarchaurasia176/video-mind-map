import {Supadata} from '@supadata/js'

export const supadata = new Supadata({
  apiKey:process.env.YOUTUBE_TRANSCRIPT || ""
}
);




