---
marp: true
---

# Wetube Clone Project

---

코드 개선 1
이거를

```
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(400)
      .render("join", {
        pageTitle, errorMessage: "This username/email is already taken.",
      });
  }
  try {
    await User.create({ email, username, password, fullname, location });
    res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", { pageTitle: "Join", errorMessage: error });
  }
```

---
요렇게 
```
  try {
    await User.create({ email, username, password, fullname, location });
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).render("edit-user", { 
        pageTitle: "Edit Profile", errorMessage: "This username/email is already taken." });
    }
    return res.status(400).render("edit-user", { 
      pageTitle: "Edit Profile", errorMessage: error });
  }
```
---
## Edit Profile에 Password 영역 추가
---
