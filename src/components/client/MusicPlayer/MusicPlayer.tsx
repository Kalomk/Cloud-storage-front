import React, { useRef, useEffect, useState, use, useCallback } from 'react';
import { useSelectedFiles } from '../Files/FilesProvider';
import './MusicPlayer.scss';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentPlay, selected, addtoCurrentPlay } = useSelectedFiles();

  const currentIndexPlay = useRef<number>(0);

  const selectMusicArray = useCallback(() => {
    const selectedMf: string[] = [];
    selected.selectedFileNames.map((mf) => {
      const selectedMFExt = mf.split('.').pop();
      if (['m4b', 'webm', 'm4p', 'flac', 'mp3', 'wav', 'm4a'].includes(selectedMFExt!)) {
        selectedMf.push(mf);
      }
    });
    return { selectedMf };
  }, [selected]);

  const changeMusicSource = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the current audio
      audioRef.current.src = currentPlay.path; // Set the new video source
      audioRef.current.load(); // Load the new audio
      audioRef.current.play(); // Play the new audio
      audioRef.current.volume = 0.5;
    }
  };

  const skipNext = () => {
    const { selectedMf } = selectMusicArray();

    if (currentIndexPlay.current !== selectedMf.length - 1) {
      currentIndexPlay.current++;
    } else {
      currentIndexPlay.current = 0;
    }
    addtoCurrentPlay(selectedMf[currentIndexPlay.current], 'audio');
    console.log(currentIndexPlay);
  };

  useEffect(() => {
    changeMusicSource();
  }, [currentPlay]);

  const skipPrev = () => {
    const { selectedMf } = selectMusicArray();

    if (currentIndexPlay.current !== 0) {
      currentIndexPlay.current--;
    } else {
      currentIndexPlay.current = selectedMf.length - 1;
    }
    addtoCurrentPlay(selectedMf[currentIndexPlay.current], 'audio');
  };
  //controls
  const [pressed, setPressed] = useState<boolean>(false);
  const [left, setLeft] = useState<boolean>(false);
  const [right, setRight] = useState<boolean>(false);
  const [down, setDown] = useState<boolean>(false);
  const [up, setUp] = useState<boolean>(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const volumeControlUp = () => {
    if (audioRef.current) {
      if (audioRef.current.volume < 1) {
        audioRef.current.volume += 0.1;
      }
    }
  };

  const volumeControlDown = () => {
    if (audioRef.current) {
      if (audioRef.current.volume > 0.1) {
        audioRef.current.volume -= 0.1;
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-[10px]">
      <div className="content">
        <div className="music-player">
          <div className="texture"></div>
          <div className="mp-inner">
            <div className="album-artwork">
              <img src="https://media.giphy.com/media/tqfS3mgQU28ko/giphy.gif" alt="img_music" />

              <div className="album-text">
                <h1 id="song-title"></h1>
                <p id="artist-name"></p>
              </div>

              <div className="album-reflection"></div>
              <div className="album-border">
                {' '}
                <svg
                  width="345"
                  height="143"
                  viewBox="0 0 345 143"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M340.505 143H345V28C345 12.536 332.464 2.37738e-05 317 2.25623e-05L29 0C12.9838 -1.25474e-06 1.2684e-05 12.9837 1.11215e-05 29L0 143H4.495L4.49501 33.0273C4.49501 17.0111 17.4788 4.02734 33.495 4.02734L312.505 4.02737C327.969 4.02737 340.505 16.5634 340.505 32.0274V143Z"
                    fill="url(#paint0_linear_1685_2624)"
                    fillOpacity="0.5"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1685_2624"
                      x1="172.5"
                      y1="143"
                      x2="172.5"
                      y2="1.35139e-05"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#D9D9D9" stopOpacity="0" />
                      <stop offset="0.786458" stopColor="#D9D9D9" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  width="345"
                  height="145"
                  viewBox="0 0 345 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.34951 0H0V114C0 129.464 12.536 142 28 142H316C332.016 142 345 129.016 345 113V0H341.65V110C341.65 126.016 328.667 139 312.65 139H31.3495C15.8856 139 3.34951 126.464 3.34951 111V0Z"
                    fill="url(#paint0_linear_1685_2758)"
                    fillOpacity="0.5"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1685_2758"
                      x1="172.5"
                      y1="0"
                      x2="172.5"
                      y2="149"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopOpacity="0" />
                      <stop offset="0.786458" stopColor="#0D0D0D" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="button-controls">
              <div
                className={`btn-overlay ${up ? 'up' : ''} ${down ? 'down' : ''} ${
                  left ? 'left' : ''
                } ${right ? 'right' : ''}`}
              >
                <div className="play-btn-shadow"></div>
                <div
                  className={`play-btn ${pressed ? 'pressed' : ''}`}
                  onMouseDown={() => setPressed(true)}
                  onMouseUp={() => setPressed(false)}
                  onClick={togglePlay}
                >
                  <div className="play-btn-overlay">
                    <div className="play-icon">
                      <svg
                        width="48"
                        height="31"
                        viewBox="0 0 48 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_diii_0_1)">
                          <path
                            d="M2 25.7434V3.31956C2 1.81294 3.60276 0.847294 4.93472 1.55143L26.5854 12.9969C28.0194 13.7551 28.0019 15.8153 26.5551 16.5489L4.9045 27.5272C3.57407 28.2018 2 27.2351 2 25.7434Z"
                            fill="#232323"
                          />
                        </g>
                        <g filter="url(#filter1_diii_0_1)">
                          <path
                            d="M40 26V3C40 1.89543 40.8954 1 42 1H44C45.1046 1 46 1.89543 46 3V26C46 27.1046 45.1046 28 44 28H42C40.8954 28 40 27.1046 40 26Z"
                            fill="#232323"
                          />
                        </g>
                        <g filter="url(#filter2_diii_0_1)">
                          <path
                            d="M30 26V3C30 1.89543 30.8954 1 32 1H34C35.1046 1 36 1.89543 36 3V26C36 27.1046 35.1046 28 34 28H32C30.8954 28 30 27.1046 30 26Z"
                            fill="#232323"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_diii_0_1"
                            x="0"
                            y="0.316406"
                            width="29.6504"
                            height="30.4297"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_0_1"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_0_1"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                            />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="-2" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.46 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect2_innerShadow_0_1"
                              result="effect3_innerShadow_0_1"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dx="1" dy="4" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect3_innerShadow_0_1"
                              result="effect4_innerShadow_0_1"
                            />
                          </filter>
                          <filter
                            id="filter1_diii_0_1"
                            x="38"
                            y="0"
                            width="10"
                            height="31"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_0_1"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_0_1"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                            />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="-2" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.46 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect2_innerShadow_0_1"
                              result="effect3_innerShadow_0_1"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dx="1" dy="4" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect3_innerShadow_0_1"
                              result="effect4_innerShadow_0_1"
                            />
                          </filter>
                          <filter
                            id="filter2_diii_0_1"
                            x="28"
                            y="0"
                            width="10"
                            height="31"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_0_1"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_0_1"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                            />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="-2" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.46 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect2_innerShadow_0_1"
                              result="effect3_innerShadow_0_1"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dx="1" dy="4" />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect3_innerShadow_0_1"
                              result="effect4_innerShadow_0_1"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  onMouseDown={() => setLeft(true)}
                  onMouseUp={() => setLeft(false)}
                  onClick={skipNext}
                  className="skip-left"
                >
                  <svg
                    width="40"
                    height="25"
                    viewBox="0 0 40 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_diii_1685_2650)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 9.79778L7 3C7 1.89543 6.10457 0.999997 5 0.999997L4 0.999997C2.89543 0.999997 2 1.89543 2 3L2 20C2 21.1046 2.89543 22 4 22L5 22C6.10457 22 7 21.1046 7 20L7 12.8382C7.107 12.9288 7.22633 13.0104 7.35802 13.0809L21.0553 20.4218C22.3876 21.1359 24 20.1706 24 18.659L24 14.4969L35.0553 20.4218C36.3876 21.1359 38 20.1706 38 18.659L38 4.27691C38 2.78036 36.4166 1.81396 35.0856 2.49817L24 8.19687L24 4.27691C24 2.78035 22.4166 1.81396 21.0856 2.49817L7.38839 9.5394C7.24469 9.61327 7.11522 9.70027 7 9.79778Z"
                        fill="url(#paint0_linear_1685_2650)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_diii_1685_2650"
                        x="0"
                        y="0"
                        width="40"
                        height="25"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1685_2650"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1685_2650"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                        />
                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1685_2650" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="-2" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.46 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect2_innerShadow_1685_2650"
                          result="effect3_innerShadow_1685_2650"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="1" dy="4" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect3_innerShadow_1685_2650"
                          result="effect4_innerShadow_1685_2650"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_1685_2650"
                        x1="20"
                        y1="9"
                        x2="26"
                        y2="29"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#282828" />
                        <stop offset="1" stopColor="#1E1D1D" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  onMouseDown={() => setRight(true)}
                  onMouseUp={() => setRight(false)}
                  onClick={skipPrev}
                  className="skip-right"
                >
                  <svg
                    width="40"
                    height="25"
                    viewBox="0 0 40 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_diii_1685_2646)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M33 13.2022V20C33 21.1046 33.8954 22 35 22H36C37.1046 22 38 21.1046 38 20V3C38 1.89543 37.1046 1 36 1H35C33.8954 1 33 1.89543 33 3V10.1618C32.893 10.0712 32.7737 9.98964 32.642 9.91906L18.9447 2.5782C17.6124 1.86415 16 2.82937 16 4.341V8.50312L4.94475 2.5782C3.61241 1.86415 2 2.82937 2 4.341V18.7231C2 20.2196 3.58339 21.186 4.91438 20.5018L16 14.8031V18.7231C16 20.2196 17.5834 21.186 18.9144 20.5018L32.6116 13.4606C32.7553 13.3867 32.8848 13.2997 33 13.2022Z"
                        fill="#232323"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_diii_1685_2646"
                        x="0"
                        y="0"
                        width="40"
                        height="25"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1685_2646"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1685_2646"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                        />
                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1685_2646" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="-2" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.46 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect2_innerShadow_1685_2646"
                          result="effect3_innerShadow_1685_2646"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="1" dy="4" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect3_innerShadow_1685_2646"
                          result="effect4_innerShadow_1685_2646"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div
                  onMouseDown={() => setUp(true)}
                  onMouseUp={() => setUp(false)}
                  onClick={volumeControlUp}
                  className={`vol-up`}
                >
                  <svg
                    width="32"
                    height="31"
                    viewBox="0 0 32 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_dii_1685_2641)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19 11.5V3C19 1.89543 18.1046 1 17 1H15C13.8954 1 13 1.89543 13 3L13 11.5H4.5C3.39543 11.5 2.5 12.3954 2.5 13.5V15.5C2.5 16.6046 3.39543 17.5 4.5 17.5H13L13 26C13 27.1046 13.8954 28 15 28H17C18.1046 28 19 27.1046 19 26V17.5H27.5C28.6046 17.5 29.5 16.6046 29.5 15.5V13.5C29.5 12.3954 28.6046 11.5 27.5 11.5H19Z"
                        fill="#1C1C1C"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_dii_1685_2641"
                        x="0.5"
                        y="0"
                        width="31"
                        height="31"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.13 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1685_2641"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1685_2641"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                        />
                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1685_2641" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="1" dy="4" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect2_innerShadow_1685_2641"
                          result="effect3_innerShadow_1685_2641"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div
                  onMouseDown={() => setDown(true)}
                  onMouseUp={() => setDown(false)}
                  onClick={volumeControlDown}
                  className="vol-down"
                >
                  <svg
                    width="32"
                    height="11"
                    viewBox="0 0 32 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_dii_1685_2644)">
                      <path
                        d="M4.5 1.5L27.5 1.5C28.6046 1.5 29.5 2.39543 29.5 3.5L29.5 5.5C29.5 6.60457 28.6046 7.5 27.5 7.5L4.5 7.5C3.39543 7.5 2.5 6.60457 2.5 5.5L2.5 3.5C2.5 2.39543 3.39543 1.5 4.5 1.5Z"
                        fill="#262626"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_dii_1685_2644"
                        x="0.5"
                        y="0.5"
                        width="31"
                        height="10"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.13 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1685_2644"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1685_2644"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="1.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                        />
                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1685_2644" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="1" dy="4" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect2_innerShadow_1685_2644"
                          result="effect3_innerShadow_1685_2644"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <audio id="audioPlayer" ref={audioRef}>
          <source src={currentPlay.path} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default MusicPlayer;
