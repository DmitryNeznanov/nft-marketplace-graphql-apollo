import NFT from "@/app/models/NFT"
import User from "@/app/models/User"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import CopyIdButton from "./components/CopyIdButton"
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const user = (await User.findById(id)) as User

  return {
    title: `NFT Marketplace | ${user.name}`,
    description: `Page with information about User with name "${user.name}" and ID "${user._id}"`,
  }
}
export async function generateStaticParams() {
  const items = (await User.find()) as User[]
  return items.map((user) => ({
    id: String(user._id),
  }))
}
export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = (await User.findById(id)) as User
  const userNFTs = await NFT.find({ author: user._id })

  return (
    <>
      <section>
        <Suspense fallback={<h2 className="h1-sans">Loading User...</h2>}>
          <div>
            <Image
              className="w-screen max-h-[250px] md:max-h-[280px] lg:max-h-[320px] xl:max-h-[450px]"
              src={user.backgroundImage}
              width={1980}
              height={320}
              alt={user.backgroundImage}
              priority
            ></Image>
          </div>
          <div className="max-w-sm md:container mx-auto">
            <article className="pb-[30px] lg:pb-[40px] flex flex-col gap-y-[30px]">
              <Image
                className="-mt-[75px] max-w-[120px] max-h-[120px] rounded-primary border-[2px] border-black"
                width={120}
                height={120}
                src={user.profileImage}
                alt={user.profileImage}
              ></Image>
              <h2 className="h2-sans">{user.name}</h2>
              <div className="flex flex-col md:flex-row gap-[20px]">
                <CopyIdButton userId={user._id.toString()}></CopyIdButton>
                <button className="w-full md:w-max button-transparent before:content-[url('/icons/plus-accent.svg')]">
                  {/* ISSUE: follow ? */}
                  Follow
                </button>
              </div>
              <div className="flex flex-row justify-between md:max-w-[430px]">
                {/* ISSUE: sematic tag ? */}
                <p className="flex flex-col">
                  <span className="text-space-mono font-bold text-[22px]/[160%] lg:text-[26px]/[160%]">
                    {user.volume}k+
                  </span>
                  <span className="p-sans-xl">Volume</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-space-mono font-bold text-[22px]/[160%] lg:text-[26px]/[160%]">
                    {user.sold}k+
                  </span>
                  <span className="p-sans-xl">NFTs Sold</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-space-mono font-bold text-[22px]/[160%] lg:text-[26px]/[160%]">
                    {user.followers}k+
                  </span>
                  <span className="p-sans-xl">Followers</span>
                </p>
              </div>
              <div>
                <h4 className="h4-space text-gray">Bio</h4>
                <p className="max-w-[600px] mt-[10px] p-sans">{user.info}</p>
              </div>
              <div>
                <h4 className="h4-space text-gray">links</h4>
                <ul className="mt-[10px] flex flex-row gap-x-[10px]">
                  <li>
                    <Link
                      href={`https://google.com/${user.name}`}
                      target="_blank"
                    >
                      <svg
                        className="fill-gray hover:fill-accent hover:scale-105"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.6875 12C3.6875 11.4477 4.13522 11 4.6875 11H27.3125C27.8648 11 28.3125 11.4477 28.3125 12C28.3125 12.5523 27.8648 13 27.3125 13H4.6875C4.13522 13 3.6875 12.5523 3.6875 12Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.6875 20C3.6875 19.4477 4.13522 19 4.6875 19H27.3125C27.8648 19 28.3125 19.4477 28.3125 20C28.3125 20.5523 27.8648 21 27.3125 21H4.6875C4.13522 21 3.6875 20.5523 3.6875 20Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.3837 8.13841C12.5439 10.0995 12 12.8783 12 16.0002C12 19.1221 12.5439 21.9009 13.3837 23.862C13.8044 24.8443 14.2797 25.5753 14.7565 26.0462C15.229 26.5129 15.6481 26.6752 16 26.6752C16.3519 26.6752 16.771 26.5129 17.2435 26.0462C17.7203 25.5753 18.1956 24.8443 18.6163 23.862C19.4561 21.9009 20 19.1221 20 16.0002C20 12.8783 19.4561 10.0995 18.6163 8.13841C18.1956 7.15609 17.7203 6.42507 17.2435 5.95417C16.771 5.4875 16.3519 5.3252 16 5.3252C15.6481 5.3252 15.229 5.4875 14.7565 5.95417C14.2797 6.42507 13.8044 7.15609 13.3837 8.13841ZM13.3511 4.53118C14.075 3.81627 14.9712 3.3252 16 3.3252C17.0288 3.3252 17.9251 3.81627 18.6489 4.53118C19.3685 5.24186 19.9707 6.2206 20.4548 7.35104C21.4246 9.61551 22 12.6741 22 16.0002C22 19.3263 21.4246 22.3849 20.4548 24.6493C19.9707 25.7798 19.3685 26.7585 18.6489 27.4692C17.925 28.1841 17.0288 28.6752 16 28.6752C14.9712 28.6752 14.075 28.1841 13.3511 27.4692C12.6315 26.7585 12.0293 25.7798 11.5452 24.6493C10.5754 22.3849 10 19.3263 10 16.0002C10 12.6741 10.5754 9.61551 11.5452 7.35104C12.0293 6.2206 12.6315 5.24186 13.3511 4.53118Z"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`https://discord.com/${user.name}`}
                      target="_blank"
                    >
                      <svg
                        className="fill-gray hover:fill-accent hover:scale-105"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 19.5C12.8284 19.5 13.5 18.8284 13.5 18C13.5 17.1716 12.8284 16.5 12 16.5C11.1716 16.5 10.5 17.1716 10.5 18C10.5 18.8284 11.1716 19.5 12 19.5Z" />
                        <path d="M20 19.5C20.8284 19.5 21.5 18.8284 21.5 18C21.5 17.1716 20.8284 16.5 20 16.5C19.1716 16.5 18.5 17.1716 18.5 18C18.5 18.8284 19.1716 19.5 20 19.5Z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.9917 10.0006C13.8239 9.98454 11.6668 10.3065 9.59816 10.9548C9.07115 11.12 8.51003 10.8267 8.34486 10.2997C8.17969 9.77266 8.47302 9.21154 9.00003 9.04637C11.2646 8.33661 13.6259 7.98379 15.9991 8.00057C18.3722 7.98379 20.7335 8.33661 22.9982 9.04637C23.5252 9.21154 23.8185 9.77266 23.6533 10.2997C23.4882 10.8267 22.927 11.12 22.4 10.9548C20.3314 10.3065 18.1743 9.98454 16.0065 10.0006H15.9917Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.34486 21.7012C8.51003 21.1742 9.07115 20.8809 9.59816 21.046C11.6668 21.6944 13.8239 22.0163 15.9917 22.0003H16.0065C18.1743 22.0163 20.3314 21.6944 22.4 21.046C22.927 20.8809 23.4882 21.1742 23.6533 21.7012C23.8185 22.2282 23.5252 22.7893 22.9982 22.9545C20.7335 23.6643 18.3722 24.0171 15.9991 24.0003C13.6259 24.0171 11.2646 23.6643 9.00003 22.9545C8.47302 22.7893 8.17969 22.2282 8.34486 21.7012Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.2195 4.81024C20.6499 4.56754 21.1546 4.4917 21.6373 4.59714C22.9549 4.88268 24.2448 5.28326 25.4924 5.79426C25.7732 5.90254 26.0254 6.07398 26.2294 6.29541C26.4357 6.5192 26.587 6.78788 26.6715 7.08017L30.9074 21.2246C31.0178 21.593 31.0204 21.9855 30.9147 22.3554C30.809 22.7253 30.5995 23.0571 30.3111 23.3116L30.3059 23.3161C28.2385 25.1151 25.4371 26.4767 22.2551 27.2567C21.8132 27.3694 21.3457 27.3256 20.9322 27.1326C20.5205 26.9404 20.1877 26.6122 19.9898 26.2035L18.4816 23.2119C18.2329 22.7188 18.4311 22.1174 18.9243 21.8688C19.4175 21.6202 20.0188 21.8184 20.2674 22.3115L21.7799 25.3115L21.781 25.3137C24.7189 24.5933 27.2131 23.3562 28.9931 21.8073L29.6495 22.5617L28.9879 21.8119C28.9897 21.8103 28.991 21.8082 28.9917 21.8059C28.9923 21.8036 28.9923 21.8012 28.9916 21.7989L24.7555 7.65368C24.752 7.65227 24.7485 7.65084 24.7449 7.64939C23.602 7.18051 22.4201 6.81314 21.2127 6.55155L21.2106 6.55107C21.2076 6.55042 21.2044 6.55089 21.2017 6.5524C21.1993 6.55375 21.1975 6.55587 21.1964 6.5584L20.2115 9.53807C20.0381 10.0625 19.4725 10.347 18.9481 10.1737C18.4238 10.0004 18.1392 9.43476 18.3125 8.91038L19.3029 5.91419C19.4624 5.44609 19.7887 5.05312 20.2195 4.81024Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.7982 6.5524C10.7955 6.55089 10.7924 6.55042 10.7894 6.55107L10.7872 6.55155C9.57988 6.81314 8.39792 7.18051 7.25502 7.64939C7.25149 7.65084 7.24795 7.65227 7.24441 7.65368L3.00842 21.7986C3.00774 21.8009 3.00764 21.8036 3.00829 21.8059C3.00888 21.808 3.01 21.8099 3.01152 21.8114C4.79121 23.3583 7.2836 24.5939 10.2189 25.3137L10.22 25.3115L11.7325 22.3115C11.9812 21.8184 12.5825 21.6202 13.0756 21.8688C13.5688 22.1174 13.767 22.7188 13.5184 23.2119L12.0101 26.2035C11.8123 26.6122 11.4795 26.9404 11.0677 27.1326C10.6542 27.3256 10.1868 27.3694 9.74481 27.2567C6.56287 26.4767 3.76151 25.1151 1.69404 23.3161L1.68886 23.3116C1.40039 23.0571 1.19093 22.7252 1.08525 22.3554C0.979591 21.9856 0.982107 21.5932 1.09249 21.2248C1.09246 21.2249 1.09252 21.2248 1.09249 21.2248L5.32839 7.08019C5.41291 6.78789 5.56426 6.51921 5.77051 6.29541C5.97457 6.07398 6.22679 5.90254 6.5076 5.79426C7.75546 5.28312 9.04577 4.88246 10.3637 4.5969C10.8461 4.49181 11.3504 4.56772 11.7805 4.81024C12.2113 5.05312 12.5375 5.4461 12.697 5.9142L12.7 5.92287L13.6874 8.91038C13.8608 9.43476 13.5762 10.0004 13.0518 10.1737C12.5274 10.347 11.9618 10.0624 11.7885 9.53807L10.8036 6.55839C10.8025 6.55586 10.8006 6.55375 10.7982 6.5524Z"
                        />
                        <path d="M12 19.5C12.8284 19.5 13.5 18.8284 13.5 18C13.5 17.1716 12.8284 16.5 12 16.5C11.1716 16.5 10.5 17.1716 10.5 18C10.5 18.8284 11.1716 19.5 12 19.5Z" />
                        <path d="M20 19.5C20.8284 19.5 21.5 18.8284 21.5 18C21.5 17.1716 20.8284 16.5 20 16.5C19.1716 16.5 18.5 17.1716 18.5 18C18.5 18.8284 19.1716 19.5 20 19.5Z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.9917 10.0006C13.8239 9.98454 11.6668 10.3065 9.59816 10.9548C9.07115 11.12 8.51003 10.8267 8.34486 10.2997C8.17969 9.77266 8.47302 9.21154 9.00003 9.04637C11.2646 8.33661 13.6259 7.98379 15.9991 8.00057C18.3722 7.98379 20.7335 8.33661 22.9982 9.04637C23.5252 9.21154 23.8185 9.77266 23.6533 10.2997C23.4882 10.8267 22.927 11.12 22.4 10.9548C20.3314 10.3065 18.1743 9.98454 16.0065 10.0006H15.9917Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.34486 21.7012C8.51003 21.1742 9.07115 20.8809 9.59816 21.046C11.6668 21.6944 13.8239 22.0163 15.9917 22.0003H16.0065C18.1743 22.0163 20.3314 21.6944 22.4 21.046C22.927 20.8809 23.4882 21.1742 23.6533 21.7012C23.8185 22.2282 23.5252 22.7893 22.9982 22.9545C20.7335 23.6643 18.3722 24.0171 15.9991 24.0003C13.6259 24.0171 11.2646 23.6643 9.00003 22.9545C8.47302 22.7893 8.17969 22.2282 8.34486 21.7012Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.2195 4.81024C20.6499 4.56754 21.1546 4.4917 21.6373 4.59714C22.9549 4.88268 24.2448 5.28326 25.4924 5.79426C25.7732 5.90254 26.0254 6.07398 26.2294 6.29541C26.4357 6.5192 26.587 6.78788 26.6715 7.08017L30.9074 21.2246C31.0178 21.593 31.0204 21.9855 30.9147 22.3554C30.809 22.7253 30.5995 23.0571 30.3111 23.3116L30.3059 23.3161C28.2385 25.1151 25.4371 26.4767 22.2551 27.2567C21.8132 27.3694 21.3457 27.3256 20.9322 27.1326C20.5205 26.9404 20.1877 26.6122 19.9898 26.2035L18.4816 23.2119C18.2329 22.7188 18.4311 22.1174 18.9243 21.8688C19.4175 21.6202 20.0188 21.8184 20.2674 22.3115L21.7799 25.3115L21.781 25.3137C24.7189 24.5933 27.2131 23.3562 28.9931 21.8073L29.6495 22.5617L28.9879 21.8119C28.9897 21.8103 28.991 21.8082 28.9917 21.8059C28.9923 21.8036 28.9923 21.8012 28.9916 21.7989L24.7555 7.65368C24.752 7.65227 24.7485 7.65084 24.7449 7.64939C23.602 7.18051 22.4201 6.81314 21.2127 6.55155L21.2106 6.55107C21.2076 6.55042 21.2044 6.55089 21.2017 6.5524C21.1993 6.55375 21.1975 6.55587 21.1964 6.5584L20.2115 9.53807C20.0381 10.0625 19.4725 10.347 18.9481 10.1737C18.4238 10.0004 18.1392 9.43476 18.3125 8.91038L19.3029 5.91419C19.4624 5.44609 19.7887 5.05312 20.2195 4.81024Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.7982 6.5524C10.7955 6.55089 10.7924 6.55042 10.7894 6.55107L10.7872 6.55155C9.57988 6.81314 8.39792 7.18051 7.25502 7.64939C7.25149 7.65084 7.24795 7.65227 7.24441 7.65368L3.00842 21.7986C3.00774 21.8009 3.00764 21.8036 3.00829 21.8059C3.00888 21.808 3.01 21.8099 3.01152 21.8114C4.79121 23.3583 7.2836 24.5939 10.2189 25.3137L10.22 25.3115L11.7325 22.3115C11.9812 21.8184 12.5825 21.6202 13.0756 21.8688C13.5688 22.1174 13.767 22.7188 13.5184 23.2119L12.0101 26.2035C11.8123 26.6122 11.4795 26.9404 11.0677 27.1326C10.6542 27.3256 10.1868 27.3694 9.74481 27.2567C6.56287 26.4767 3.76151 25.1151 1.69404 23.3161L1.68886 23.3116C1.40039 23.0571 1.19093 22.7252 1.08525 22.3554C0.979591 21.9856 0.982107 21.5932 1.09249 21.2248C1.09246 21.2249 1.09252 21.2248 1.09249 21.2248L5.32839 7.08019C5.41291 6.78789 5.56426 6.51921 5.77051 6.29541C5.97457 6.07398 6.22679 5.90254 6.5076 5.79426C7.75546 5.28312 9.04577 4.88246 10.3637 4.5969C10.8461 4.49181 11.3504 4.56772 11.7805 4.81024C12.2113 5.05312 12.5375 5.4461 12.697 5.9142L12.7 5.92287L13.6874 8.91038C13.8608 9.43476 13.5762 10.0004 13.0518 10.1737C12.5274 10.347 11.9618 10.0624 11.7885 9.53807L10.8036 6.55839C10.8025 6.55586 10.8006 6.55375 10.7982 6.5524Z"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`https://youtube.com/${user.name}`}
                      target="_blank"
                    >
                      <svg
                        className="fill-gray hover:fill-accent hover:scale-105"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.5281 11.1183C13.8533 10.9443 14.2478 10.9634 14.5547 11.168L20.5547 15.168C20.8329 15.3534 21 15.6656 21 16C21 16.3344 20.8329 16.6466 20.5547 16.8321L14.5547 20.8321C14.2478 21.0366 13.8533 21.0557 13.5281 20.8817C13.203 20.7077 13 20.3688 13 20V12C13 11.6312 13.203 11.2923 13.5281 11.1183ZM15 13.8685V18.1315L18.1972 16L15 13.8685Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.9985 5.05082L15.9816 5.05078L15.9188 5.05081C15.8643 5.05093 15.785 5.05133 15.6831 5.05241C15.4794 5.05457 15.1856 5.05947 14.8206 5.07043C14.0912 5.09232 13.0746 5.13847 11.9237 5.23563C9.64733 5.42782 6.74928 5.82669 4.51808 6.6792L4.50338 6.68495C4.06511 6.86039 3.6742 7.13637 3.36218 7.49064C3.05016 7.84491 2.82577 8.26755 2.70711 8.72447L2.70614 8.72824C2.39473 9.9468 2 12.2065 2 16.0008C2 19.7952 2.39473 22.0549 2.70614 23.2734L2.70711 23.2772C2.82577 23.7341 3.05016 24.1568 3.36218 24.511C3.6742 24.8653 4.06511 25.1413 4.50338 25.3167L4.51808 25.3225C6.74928 26.175 9.64733 26.5739 11.9237 26.766C13.0746 26.8632 14.0912 26.9094 14.8206 26.9312C15.1856 26.9422 15.4794 26.9471 15.6831 26.9493C15.785 26.9504 15.8643 26.9507 15.9188 26.9509L15.9816 26.9509L15.9985 26.9509H16.0015L16.0184 26.9509L16.0812 26.9509C16.1357 26.9507 16.215 26.9504 16.3169 26.9493C16.5206 26.9471 16.8144 26.9422 17.1794 26.9312C17.9088 26.9094 18.9254 26.8632 20.0763 26.766C22.3527 26.5739 25.2507 26.175 27.4819 25.3225L27.4966 25.3167C27.9349 25.1413 28.3258 24.8653 28.6378 24.511C28.9498 24.1568 29.1742 23.7341 29.2929 23.2772L29.2939 23.2734C29.6053 22.0549 30 19.7952 30 16.0008C30 12.2065 29.6053 9.9468 29.2939 8.72824L29.2929 8.72447C29.1742 8.26755 28.9498 7.84491 28.6378 7.49064C28.3258 7.13637 27.9349 6.86039 27.4966 6.68495L27.4819 6.6792C25.2507 5.82669 22.3527 5.42782 20.0763 5.23563C18.9254 5.13847 17.9088 5.09232 17.1794 5.07043C16.8144 5.05947 16.5206 5.05457 16.3169 5.05241C16.215 5.05133 16.1357 5.05093 16.0812 5.05081L16.0184 5.05078L16.0015 5.05082H15.9985ZM15.9947 24.9509L16.0054 24.9508L16.0086 24.9509L16.0217 24.9509L16.0767 24.9509C16.1259 24.9508 16.1996 24.9504 16.2957 24.9494C16.4877 24.9473 16.7686 24.9427 17.1194 24.9321C17.8216 24.9111 18.8011 24.8666 19.9081 24.7731C22.1441 24.5843 24.8041 24.2028 26.7596 23.4574C26.9044 23.3984 27.0336 23.3066 27.1369 23.1892C27.2414 23.0705 27.3167 22.929 27.3567 22.7761C27.6203 21.7438 28 19.6539 28 16.0008C28 12.3478 27.6203 10.2578 27.3567 9.22562C27.3167 9.07265 27.2414 8.93117 27.1369 8.81251C27.0336 8.69512 26.9044 8.60331 26.7596 8.54424C24.8041 7.79889 22.1441 7.41733 19.9081 7.22854C18.8011 7.13509 17.8216 7.09061 17.1194 7.06953C16.7686 7.059 16.4877 7.05433 16.2957 7.0523C16.1996 7.05128 16.1259 7.05092 16.0767 7.05081L16.0217 7.05078L16.0086 7.05081L16.0058 7.05082L15.9946 7.05088L15.9914 7.05081L15.9783 7.05078L15.9233 7.05081C15.8741 7.05092 15.8004 7.05128 15.7043 7.0523C15.5123 7.05433 15.2314 7.059 14.8806 7.06953C14.1784 7.09061 13.1989 7.13509 12.0919 7.22854C9.8559 7.41733 7.1959 7.79889 5.24039 8.54424C5.09561 8.60331 4.96645 8.69513 4.86306 8.81251C4.75855 8.93117 4.6833 9.07265 4.64331 9.22562C4.37974 10.2578 4 12.3478 4 16.0008C4 19.6539 4.37973 21.7438 4.6433 22.7761C4.68329 22.929 4.75855 23.0705 4.86306 23.1892C4.96645 23.3066 5.09561 23.3984 5.24038 23.4574C7.1959 24.2028 9.8559 24.5843 12.0919 24.7731C13.1989 24.8666 14.1784 24.9111 14.8806 24.9321C15.2314 24.9427 15.5123 24.9473 15.7043 24.9494C15.8004 24.9504 15.8741 24.9508 15.9233 24.9509L15.9783 24.9509L15.9914 24.9509L15.9947 24.9509Z"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`https://x.com/${user.name}`}
                      target="_blank"
                    >
                      <svg
                        className="fill-gray hover:fill-accent hover:scale-105"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.0007 11.0005C16.0007 8.25045 18.3132 5.96295 21.0632 6.00045C22.0262 6.01157 22.9656 6.3006 23.7683 6.8328C24.571 7.365 25.203 8.11771 25.5882 9.00045H30.0007L25.9632 13.038C25.7026 17.0937 23.9073 20.8979 20.9422 23.6773C17.9771 26.4566 14.0648 28.0025 10.0007 28.0005C6.00068 28.0005 5.00068 26.5005 5.00068 26.5005C5.00068 26.5005 9.00068 25.0005 11.0007 22.0005C11.0007 22.0005 3.00068 18.0005 5.00068 7.00045C5.00068 7.00045 10.0007 12.0005 16.0007 13.0005V11.0005Z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`https://instagram.com/${user.name}`}
                      target="_blank"
                    >
                      <svg
                        className="fill-gray hover:fill-accent hover:scale-105"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12ZM10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.5 5.5C7.73858 5.5 5.5 7.73858 5.5 10.5V21.5C5.5 24.2614 7.73858 26.5 10.5 26.5H21.5C24.2614 26.5 26.5 24.2614 26.5 21.5V10.5C26.5 7.73858 24.2614 5.5 21.5 5.5H10.5ZM3.5 10.5C3.5 6.63401 6.63401 3.5 10.5 3.5H21.5C25.366 3.5 28.5 6.63401 28.5 10.5V21.5C28.5 25.366 25.366 28.5 21.5 28.5H10.5C6.63401 28.5 3.5 25.366 3.5 21.5V10.5Z"
                        />
                        <path d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </Suspense>
      </section>
      <section className="bg-black-white">
        {/* TODO: tabs */}
        <div className="max-w-sm md:container mx-auto">
          {
            <div className="mt-[30px] md:mt-[60px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              <Suspense
                fallback={<h2 className="h1-sans">Loading author NFTs...</h2>}
              >
                {userNFTs.map(async (item: NFT, i) => {
                  return (
                    <article
                      className="max-w-[330px] w-full rounded-primary overflow-hidden scale-primary"
                      key={i}
                    >
                      <div>
                        <Link href={`/marketplace/${item._id}`}>
                          <Image
                            className="w-full"
                            src={item.image}
                            width={420}
                            height={296}
                            alt={`item-${i + 1}`}
                          ></Image>
                        </Link>
                      </div>
                      <div className="p-[20px] md:px-[30px] bg-black">
                        <div>
                          <Link
                            className="w-max block"
                            href={`/marketplace/${item._id}`}
                          >
                            <h3 className="h3-sans hover:hover:underline-primary">
                              {item.title}
                            </h3>
                          </Link>
                          <Link
                            className={`w-max mt-[5px] flex items-center font-work-sans text-[16px]/[140%] hover:underline-primary`}
                            href={`/users/${item.author}`}
                          >
                            <Image
                              className="mr-[12px] rounded-full"
                              src={user.profileImage}
                              width={24}
                              height={24}
                              alt="userProfileImage"
                            ></Image>
                            <p className="p-space">{user.name}</p>
                          </Link>
                        </div>
                        <div className="mt-[25px] flex flex-row justify-between items-center">
                          <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                            Price
                            <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                              {item.price} ETH
                            </span>
                          </p>
                          <p className="font-space-mono text-gray font-normal text-[12px]/[110%]">
                            Highest Bid
                            <span className="mt-[8px] block font-space-mono font-normal text-white text-[12px]/[140%] md:text-[16px]/[140%]">
                              {item.bid} ETH
                            </span>
                          </p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </Suspense>
            </div>
          }
        </div>
      </section>
    </>
  )
}
