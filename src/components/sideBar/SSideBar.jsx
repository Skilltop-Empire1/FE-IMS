import clsx from 'clsx'
import {
  DollarSign,
  FileIcon,
  GroupIcon,
  HomeIcon,
  PlusCircleIcon,
  Power,
  PowerCircle,
  SearchSlash,
  SearchSlashIcon,
  SettingsIcon,
  SparklesIcon,
  StoreIcon,
} from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function SSideBar() {
  const { pathname } = useLocation()
  console.log({ pathname })
  return (
    <div className="w-72 h-[calc(100vh-4.2rem)] mt-20 max-h-screen bg-imsPurple flex flex-col justify-between py-10 fixed">
      <div className=" px-2 flex flex-col gap-1">
        {routes.map(({ path, label, icon }, index) => {
          return (
            <Link
              key={index}
              to={`/app/${path}`}
              className={clsx(
                'group px-10 py-2 font-normal text-sm text-gray-100 items-center flex gap-2 hover:bg-imsDarkPurple/60 hover:text-white rounded-sm',
                {
                  'bg-imsDarkPurple': pathname == `/app/${path}`,
                },
              )}
            >
              {icon}
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
      <div className=" px-2 flex flex-col gap-1">
        <Link
          to="/app/staff"
          className={clsx(
            'group px-10 py-2 text-sm text-gray-100 items-center flex gap-2 hover:bg-imsDarkPurple/60 hover:text-white rounded-sm',
            {
              'bg-imsDarkPurple': pathname == `/app/staff`,
            },
          )}
        >
          <PlusCircleIcon size={14} />
          <span>Add Staff</span>
        </Link>
        <Link
          to={``}
          className={clsx(
            'group px-10 py-2 text-sm text-gray-100 items-center flex gap-2 hover:bg-imsDarkPurple/60 hover:text-white rounded-sm',
          )}
        >
          <PlusCircleIcon size={14} />
          <span>Add Product</span>
        </Link>
        <Link
          to={``}
          className={clsx(
            'group px-10 py-2 text-sm text-gray-100 items-center flex gap-2 hover:bg-imsDarkPurple/60 hover:text-white rounded-sm',
          )}
        >
          <Power size={14} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  )
}

export default SSideBar

const routes = [
  {
    label: 'Home',
    path: '',
    icon: <HomeIcon size={15} className="group-hover:animate-pulse" />,
  },
  {
    label: 'Products',
    path: 'products',
    icon: <FileIcon size={15} className="group-hover:animate-pulse" />,
  },
  {
    label: 'Categories',
    path: 'categories',
    icon: <GroupIcon size={15} className="group-hover:animate-pulse" />,
  },
  {
    label: 'Stores',
    path: 'stores',
    icon: <StoreIcon size={15} className="group-hover:animate-pulse" />,
  },
  {
    label: 'Sales Records',
    path: 'sales-records',
    icon: <SparklesIcon size={15} className="group-hover:animate-pulse" />,
  },
  {
    label: 'Account',
    path: 'accounts',
    icon: <DollarSign size={15} className="group-hover:animate-pulse" />,
  },
  {
    label: 'Settings',
    path: 'settings',
    icon: <SearchSlashIcon size={15} className="group-hover:animate-pulse" />,
  },
]
