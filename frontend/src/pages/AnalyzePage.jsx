import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Image as ImageIcon, LoaderCircle, Sparkles, UploadCloud } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { analyzeContent } from '../services/api';
import LoadingState from '../components/LoadingState';
import { fictionalDemoExamples } from '../data/demoExamples';

const loadingSteps = [
  'Reading the content...',
  'Identifying claims...',
  'Checking for red flags...',
  'Preparing verification guidance...',
];

function AnalyzePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('text');
  const [text, setText] = useState(location.state?.exampleText || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('');
  const [ocrStatus, setOcrStatus] = useState('');
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);

  useEffect(() => {
    if (location.state?.exampleText) {
      setText(location.state.exampleText);
    }
  }, [location.state]);

  const handleTextChange = (value) => {
    setText(value);
    if (error) setError('');
  };

  const validateFile = (file) => {
    if (!file) return false;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload a PNG, JPG, or WEBP image.');
      return false;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Image is too large. Please upload an image smaller than 10MB.');
      return false;
    }

    return true;
  };

  const runOCR = async (file) => {
    setIsOcrLoading(true);
    setOcrProgress(0);
    setOcrStatus('Extracting text from the image...');

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        },
      });

      const extractedText = result?.data?.text?.trim();

      if (extractedText) {
        setText(extractedText);
        setOcrStatus('Text was extracted successfully. Review it and edit if needed before analyzing.');
      } else {
        setText('');
        setOcrStatus("We couldn't reliably extract text from this image. Please paste the text manually.");
      }
    } catch (err) {
      setText('');
      setOcrStatus("We couldn't reliably extract text from this image. Please paste the text manually.");
    } finally {
      setIsOcrLoading(false);
      setOcrProgress(0);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      setImagePreview(reader.result);
      setImageName(file.name);
      setError('');
      setOcrStatus('');
      await runOCR(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      setImagePreview(reader.result);
      setImageName(file.name);
      setError('');
      setOcrStatus('');
      await runOCR(file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview('');
    setImageName('');
    setOcrStatus('');
    setText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError('Please enter some content or upload a screenshot before analyzing.');
      return;
    }

    if (trimmedText.length > 12000) {
      setError('The content is too long. Please shorten it to under 12,000 characters.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await analyzeContent({ text: trimmedText, imageDataUrl: imagePreview || null });
      navigate('/result', {
        state: {
          analysis: result.analysis || result,
          demoMode: Boolean(result.demoMode),
          warning: result.warning || '',
        },
      });
    } catch (err) {
      setError(err.message || 'Something went wrong while analyzing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Analyze content</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Check the message before trusting it.</h1>
        </div>
      </div>

      {isLoading ? (
        <LoadingState steps={loadingSteps} />
      ) : (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft sm:p-8">
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'text' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Paste Text
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('image')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'image' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Upload Screenshot
            </button>
          </div>

          {activeTab === 'text' ? (
            <div>
              <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
                <span>Financial content</span>
                <span>{text.length}/12000</span>
              </div>
              <textarea
                value={text}
                onChange={(event) => handleTextChange(event.target.value)}
                placeholder="Paste a financial message, social media caption, video claim, or forwarded message here..."
                className="min-h-[260px] w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                aria-label="Paste financial content"
              />

              <div className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-700">
                  <Sparkles className="h-4 w-4" />
                  Fictional demo content
                </div>
                <div className="flex flex-wrap gap-2">
                  {fictionalDemoExamples.map((example) => (
                    <button
                      key={example.id}
                      type="button"
                      onClick={() => setText(example.content)}
                      className="rounded-full border border-cyan-300 bg-white px-3 py-1.5 text-xs font-medium text-cyan-800 transition hover:bg-cyan-100"
                    >
                      {example.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-cyan-500 hover:bg-cyan-50"
              >
                <UploadCloud className="h-12 w-12 text-cyan-600" />
                <p className="mt-4 text-lg font-semibold text-slate-800">Drag and drop an image here</p>
                <p className="mt-1 text-sm text-slate-500">or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload screenshot"
                />
              </label>

              {imagePreview && (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <ImageIcon className="h-4 w-4" />
                      {imageName}
                    </div>
                    <button type="button" onClick={removeImage} className="text-sm font-medium text-red-600 hover:text-red-700">
                      Remove image
                    </button>
                  </div>
                  <img src={imagePreview} alt="Uploaded financial content preview" className="max-h-72 rounded-2xl object-contain" />
                </div>
              )}

              {isOcrLoading && (
                <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-700">
                  <div className="flex items-center gap-2 font-medium">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Extracting text from image... {ocrProgress}%
                  </div>
                </div>
              )}

              {ocrStatus && (
                <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                  <AlertCircle className="mt-0.5 h-4 w-4" />
                  <span>{ocrStatus}</span>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Demo-safe, educational review only
            </div>
            <button
              type="button"
              onClick={handleAnalyze}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
            >
              Analyze Content
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyzePage;
