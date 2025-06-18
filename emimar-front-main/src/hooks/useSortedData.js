import { useState, useMemo } from "react";

const parseDate = (str) => {
  if (!str) return new Date("Invalid");

  if (/^\d{4}-\d{2}-\d{2}T/.test(str)) {
    console.log('years');
    return new Date(str);
  }

  if (/^\d{2}\.\d{2}\.\d{4}$/.test(str)) {
    const [day, month, year] = str.split(".");
    return new Date(`${year}-${month}-${day}T00:00:00`);
  }

  return new Date("Invalid");
};


export const useSortedData = (data = [], search = "") => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    const filtered = data.filter((u) =>
      search?.length > 0
        ? u.title.toLowerCase().includes(search.toLowerCase())
        : true
    );

    return [...filtered].sort((a, b) => {
      if (!sortBy) return 0;

      if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      if (sortBy === "email") {
        return sortOrder === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      }

      if (sortBy === "display_name") {
        return sortOrder === "asc"
          ? a.display_name.localeCompare(b.display_name)
          : b.display_name.localeCompare(a.display_name);
      }

      if (sortBy === "user") {
        const getFullNameString = (list) =>
          Array.isArray(list)
            ? list
                .map((u) => u?.display_name?.toLowerCase()?.trim())
                .filter(Boolean)
                .join(",")
            : "";

        const aNames = getFullNameString(a.user);
        const bNames = getFullNameString(b.user);

        return sortOrder === "asc"
          ? aNames.localeCompare(bNames)
          : bNames.localeCompare(aNames);
      }

      if (sortBy === "groups") {
        const aUsers = a.user?.map((u) => u?.display_name)?.join(", ") || "";
        const bUsers = b.user?.map((u) => u?.display_name)?.join(", ") || "";

        return sortOrder === "asc"
          ? aUsers.localeCompare(bUsers)
          : bUsers.localeCompare(aUsers);
      }

      if (sortBy === "create_at") {
        const aDate = parseDate(a.create_at);
        const bDate = parseDate(b.create_at);

        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }
      
      if (sortBy === "created_at") {
        const aDate = parseDate(a.created_at);
        const bDate = parseDate(b.created_at);

        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      return 0;
    });
  }, [data, sortBy, sortOrder, search]);

  return {
    sortedData,
    sortBy,
    sortOrder,
    handleSort,
  };
};
