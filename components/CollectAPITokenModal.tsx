export default function CollectAPITokenModal({
  showModal,
  setShowModal,
  apiToken,
  setApiToken,
}: {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  apiToken: string;
  setApiToken: (val: string) => void;
}) {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border border-gray-500 bg-black shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-2xl font-semibold">Provide your OPEN AI token to proceed</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-white opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-white opacity-5 outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <input
                    type="text"
                    placeholder="sk-XXXXXXXXXXXXXXX"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    className="mx-auto mt-10 w-full rounded-lg border border-gray-500 bg-black p-3 outline-1 outline-white sm:mt-7"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mr-1 mb-1 rounded-2xl px-6 py-2 text-sm font-bold uppercase text-gray-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mr-1 mb-1 rounded-2xl bg-rose-500 px-6 py-3 text-sm font-bold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-rose-600"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Locally
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
